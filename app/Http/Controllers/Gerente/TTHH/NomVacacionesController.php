<?php

namespace App\Http\Controllers\Gerente\TTHH;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\NomGestionVacacionRequest;
use App\Http\Requests\NomVacacionesRequest;
use App\Models\NomAsignacionVacacionesPeriodo;
use App\Models\NomMotivoVacaciones;
use App\Models\NomVacacion;
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
                    'nmv.motivo_vacaciones',
                    'nv.cdgo_usrio',
                    'u.nmbre_usrio as solicitante',
                    'nv.jefe_id',
                    'usj.nmbre_usrio as jefe',
                    'nv.director_id',
                    'usd.nmbre_usrio as director',
                    'nv.estado_id',
                    'pep.per_est_nombre as estado'
                )
                ->join('nom_motivos_vacaciones as nmv', 'nmv.id', 'nv.motivo_id')
                ->join('usrios_sstma as u', 'u.cdgo_usrio', 'nv.cdgo_usrio')
                ->leftJoin('usrios_sstma as usj', 'usj.cdgo_usrio', 'nv.jefe_id')
                ->leftJoin('usrios_sstma as usd', 'usd.cdgo_usrio', 'nv.director_id')
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
            $vacacion = NomVacacion::find($id);
            $vacacion->estado_id = $request->estado_id;

            if ($request->estado_id == 2) { // Aprobado
                // Validamos si ya está asignado
                if ($vacacion->asignaciones()->exists()) {
                    return response()->json([
                        'status' => MsgStatus::Error,
                        'msg' => 'Ya se asignaron días a esta solicitud.'
                    ], 400);
                }

                // Si el personal de TTHH desea reasignar los periodos vacacionales
                /*  if ($vacacion->asignaciones()->exists()) {
                    // Eliminar asignaciones anteriores para reasignar desde cero
                    foreach ($vacacion->asignaciones as $asignacion) {
                        $periodo = $asignacion->periodo;
                        $periodo->dias_disponibles += $asignacion->dias_usados;
                        $periodo->dias_tomados -= $asignacion->dias_usados;
                        $periodo->save();
                        $asignacion->delete();
                    }
                } */

                $diasRestantes = $vacacion->dias_solicitados;
                $usuario = $vacacion->usuario;

                // Buscar periodos disponibles
                $periodos = $usuario->periodosVacacionales()
                    ->where('activo', true)
                    ->whereColumn('dias_disponibles', '>', 0)
                    ->orderBy('anio')
                    ->get();

                foreach ($periodos as $periodo) {
                    if ($diasRestantes <= 0) break;

                    $disponibles = $periodo->dias_disponibles;
                    if ($disponibles <= 0) continue;

                    $aUsar = min($disponibles, $diasRestantes);

                    // Crear asignación
                    NomAsignacionVacacionesPeriodo::create([
                        'nom_vacacion_id' => $vacacion->id,
                        'nom_periodo_vacacional_id' => $periodo->id,
                        'dias_usados' => $aUsar
                    ]);

                    // Actualizar periodo
                    $periodo->dias_disponibles -= $aUsar;
                    $periodo->dias_tomados += $aUsar;
                    $periodo->save();

                    $diasRestantes -= $aUsar;
                }

                if ($diasRestantes > 0) {
                    return response()->json([
                        'status' => MsgStatus::Error,
                        'msg' => 'No hay suficientes días en los periodos disponibles para aprobar esta solicitud.'
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
                'msg' => 'Solicitud actualizada correctamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
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
                    'nv.fecha_inicio',
                    'nv.fecha_fin',
                    'nv.fecha_retorno',
                    'nv.dias_solicitados',
                    'nv.motivo_id',
                    'nvm.motivo_vacaciones',
                    'usj.nmbre_usrio as jefe',
                    'usd.nmbre_usrio as director',
                    'nv.estado_id',
                    'pep.per_est_nombre as estado',
                    'pep.color'
                )
                ->join('usrios_sstma as us', 'us.cdgo_usrio', 'nv.cdgo_usrio')
                ->leftJoin('usrios_sstma as usj', 'usj.cdgo_usrio', 'nv.jefe_id')
                ->leftJoin('usrios_sstma as usd', 'usd.cdgo_usrio', 'nv.director_id')
                ->join('nom_motivos_vacaciones as nvm', 'nvm.id', 'nv.motivo_id')
                ->join('per_estado_permiso as pep', 'pep.idper_estado_permiso', 'nv.estado_id')
                ->byUsuarioId($request->cdgo_usrio)
                ->byCodigo($request->codigo)
                ->byAnio($request->anio)
                ->get();

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
