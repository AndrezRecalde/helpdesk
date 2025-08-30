<?php

namespace App\Http\Controllers\Gerente\TTHH;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\NomGestionVacacionRequest;
use App\Http\Requests\NomVacacionesRequest;
use App\Models\NomAsignacionVacacionesPeriodo;
use App\Models\NomMotivoVacaciones;
use App\Models\NomPeriodoVacacional;
use App\Models\NomVacacion;
use App\Models\Soporte;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
//use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class NomVacacionesController extends Controller
{

    //Metodo Para cargar los Motivos de las Vacaciones (NO ERA NECESARIO CREAR UN CRUD)
    public function getMotivosVacaciones(): JsonResponse
    {
        try {
            $motivos = NomMotivoVacaciones::where('activo', 1)->get(['id', 'motivo_vacaciones']);

            return response()->json(['status' => MsgStatus::Success, 'motivos' => $motivos], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    //Metodo General al usuario, para que el empleado solicite vacaciones
    public function solicitarVacaciones(NomVacacionesRequest $request): JsonResponse
    {

        try {
            DB::beginTransaction();

            // Paso 1: Crear el registro sin el código (necesitamos primero el ID)
            $vacacion = new NomVacacion();
            $vacacion->fill($request->validated());
            $vacacion->estado_id = 1; // Estado GENERADO
            $vacacion->usuario_creador = Auth::user()->cdgo_usrio;
            $vacacion->save();

            // Paso 2: Generar el código personalizado
            $codigo = now()->year
                . str_pad($vacacion->id, 5, '0', STR_PAD_LEFT)
                . str_pad(rand(0, 99), 2, '0', STR_PAD_LEFT);

            // Paso 3: Asignar y guardar
            $vacacion->codigo_vacacion = $codigo;
            $vacacion->save();

            $user = Auth::user();

            if ($user->isGerenteTic() && $user->cdgo_usrio != $vacacion->cdgo_usrio) {
                Soporte::create([
                    'id_tipo_solicitud'   => 7,
                    'id_direccion'        => $vacacion->direccion_id,
                    'id_usu_recibe'       => $vacacion->cdgo_usrio,
                    'id_area_tic'         => 5,
                    'id_tipo_soporte'     => 3,
                    'id_usu_tecnico_asig' => $user->cdgo_usrio,
                    'incidente'           => MsgStatus::FichaIncidenciaVacacion,
                    'solucion'            => MsgStatus::FichaSolucionVacacion,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => 'Solicitud No. ' . $vacacion->codigo_vacacion . ' generada con éxito',
                'codigo' => $vacacion->codigo_vacacion
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function exportFichaVacaciones(Request $request)
    {
        try {
            $vacaciones = NomVacacion::from('nom_vacaciones as nv')
                ->select(
                    'nv.id',
                    'nv.fecha_solicitud',
                    'nv.codigo_vacacion',
                    'nv.fecha_inicio',
                    'nv.fecha_fin',
                    'nv.fecha_retorno',
                    'nv.dias_solicitados',
                    'nv.motivo_id',
                    'nv.reemplazo_id',
                    'usr.nmbre_usrio as reemplazo',
                    'nmv.motivo_vacaciones',
                    'nv.cdgo_usrio',
                    'u.nmbre_usrio as solicitante',
                    'nv.direccion_id',
                    'd.nmbre_dprtmnto as direccion',
                    'nv.jefe_id',
                    'usj.nmbre_usrio as jefe',
                    'nv.director_id',
                    'usd.nmbre_usrio as director',
                    'nv.estado_id',
                    'pep.per_est_nombre as estado'
                )
                ->join('nom_motivos_vacaciones as nmv', 'nmv.id', 'nv.motivo_id')
                ->join('usrios_sstma as u', 'u.cdgo_usrio', 'nv.cdgo_usrio')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'nv.direccion_id')
                ->leftJoin('usrios_sstma as usj', 'usj.cdgo_usrio', 'nv.jefe_id')
                ->leftJoin('usrios_sstma as usd', 'usd.cdgo_usrio', 'nv.director_id')
                ->leftJoin('usrios_sstma as usr', 'usr.cdgo_usrio', 'nv.reemplazo_id')
                ->join('per_estado_permiso as pep', 'pep.idper_estado_permiso', 'nv.estado_id')
                ->where('nv.codigo_vacacion', $request->codigo_vacacion)
                ->first();

            $motivos = NomMotivoVacaciones::where('activo', 1)->get(['id', 'motivo_vacaciones']);

            $data = [
                'institucion' => 'GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS',
                'titulo'      => 'CONCESIÓN DE VACACIONES',
                'vacaciones'  => $vacaciones,
                'motivos'     => $motivos
            ];
            $pdf = Pdf::loadView('pdf.vacaciones.general.new', $data);
            return $pdf->setPaper('a4', 'portrait')->download('vacaciones.pdf');
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    // Metodo para que TTHH apruebe o anule la solicitud y seleccione el periodo
    public function gestionarVacaciones(NomGestionVacacionRequest $request, int $id): JsonResponse
    {
        try {
            $vacacion = NomVacacion::findOrFail($id);
            $vacacion->estado_id = $request->estado_id;

            if ($request->estado_id == 2) { // Aprobado
                // Validamos si ya está asignado
                if ($vacacion->asignaciones()->exists()) {
                    return response()->json([
                        'status' => MsgStatus::Error,
                        'msg'    => 'Ya se asignaron días a esta solicitud.'
                    ], 400);
                }

                $periodos = $request->input('periodos', []);
                $diasTotalesAsignados = 0;

                foreach ($periodos as $p) {
                    $periodo = NomPeriodoVacacional::findOrFail($p['periodo_id']);
                    $diasUsados = (int) $p['dias_usados'];
                    $observacion = $p['observacion'] ?? '';

                    if ($diasUsados <= 0 || $diasUsados > $periodo->dias_disponibles) {
                        return response()->json([
                            'status' => MsgStatus::Error,
                            'msg'    => "Los días asignados superan los disponibles o no son válidos para el periodo {$periodo->anio}."
                        ], 400);
                    }

                    // Crear asignación
                    NomAsignacionVacacionesPeriodo::create([
                        'nom_vacacion_id'           => $vacacion->id,
                        'nom_periodo_vacacional_id' => $periodo->id,
                        'dias_usados'               => $diasUsados,
                        'observacion'               => $observacion
                    ]);

                    // Actualizar periodo
                    $periodo->dias_disponibles -= $diasUsados;
                    $periodo->dias_tomados += $diasUsados;
                    $periodo->save();

                    $diasTotalesAsignados += $diasUsados;
                }

                if ($diasTotalesAsignados < $vacacion->dias_solicitados) {
                    return response()->json([
                        'status' => MsgStatus::Error,
                        'msg'    => 'No se asignaron todos los días solicitados.'
                    ], 400);
                }
            }

            if ($request->estado_id == 6) { // Anulado
                $vacacion->fecha_anulado = now();
                if (!$vacacion->observacion_anulado) {
                    $vacacion->observacion_anulado = 'SE ANULA SOLICITUD VACACIONAL A PETICION DEL USUARIO DESDE LA RECEPCION DE TTHH';
                }

                // Si ya había sido aprobada, revertir días asignados
                foreach ($vacacion->asignaciones as $asignacion) {
                    $periodo = $asignacion->periodo;
                    $periodo->dias_disponibles += $asignacion->dias_usados;
                    $periodo->dias_tomados -= $asignacion->dias_usados;
                    $periodo->save();
                    $asignacion->delete();
                }
            }

            $vacacion->save();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => 'Solicitud actualizada correctamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => $th->getMessage()
            ], 500);
        }
    }



    // Metodo para ver las fichas de Vacaciones
    function getSolicitudesVacaciones(Request $request): JsonResponse
    {
        try {
            $solicitudes = NomVacacion::from('nom_vacaciones as nv')
                ->select(
                    'nv.id',
                    'nv.codigo_vacacion',
                    'nv.cdgo_usrio',
                    'us.nmbre_usrio as solicitante',
                    'nv.direccion_id',
                    'd.nmbre_dprtmnto as direccion',
                    'nv.fecha_inicio',
                    'nv.fecha_fin',
                    'nv.fecha_retorno',
                    'nv.dias_solicitados',
                    'nv.motivo_id',
                    'nv.reemplazo_id',
                    'usr.nmbre_usrio as reemplazo',
                    'nvm.motivo_vacaciones',
                    'usj.nmbre_usrio as jefe',
                    'usd.nmbre_usrio as director',
                    'nv.estado_id',
                    'pep.per_est_nombre as estado',
                    'pep.color'
                )
                ->join('usrios_sstma as us', 'us.cdgo_usrio', 'nv.cdgo_usrio')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'nv.direccion_id')
                ->leftJoin('usrios_sstma as usj', 'usj.cdgo_usrio', 'nv.jefe_id')
                ->leftJoin('usrios_sstma as usd', 'usd.cdgo_usrio', 'nv.director_id')
                ->leftJoin('usrios_sstma as usr', 'usr.cdgo_usrio', 'nv.reemplazo_id')
                ->join('nom_motivos_vacaciones as nvm', 'nvm.id', 'nv.motivo_id')
                ->join('per_estado_permiso as pep', 'pep.idper_estado_permiso', 'nv.estado_id')
                ->byUsuarioId($request->cdgo_usrio)
                ->byCodigo($request->codigo)
                ->byAnio($request->anio)
                ->latest('nv.created_at', 'DESC')->get();

            return response()->json([
                'status'      => MsgStatus::Success,
                'solicitudes' => $solicitudes
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function solicitarAnulacion(Request $request, int $id): JsonResponse  //PARA LOS USUARIOS
    {
        try {
            $vacacion = NomVacacion::findOrFail($id);
            $vacacion->estado_id = 8; // Estado EN PROCESO DE ANULACION
            $vacacion->observaciones_anulado = $request->observaciones_anulado;
            $vacacion->save();

            return response()->json(['status' => MsgStatus::Success, 'msg' => 'Solicitud de anulación enviada'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
