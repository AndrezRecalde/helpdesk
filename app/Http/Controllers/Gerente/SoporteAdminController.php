<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Mail\TecnicoMail;
use App\Mail\UsuarioMail;
use Illuminate\Http\Request;
use App\Http\Requests\AnularSoporteRequest;
use App\Http\Requests\SolicitudAdminRequest;
use App\Http\Requests\SoporteAsignarcionRequest;
use App\Http\Requests\SoporteRequest;
use App\Models\Soporte;
use App\Models\User;
use App\Services\TelegramService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


class SoporteAdminController extends Controller
{

    protected $telegramService;

    public function __construct(TelegramService $telegramService)
    {
        $this->telegramService = $telegramService;
    }

    function getSoporteForNumero(Request $request): JsonResponse
    {
        $soporte = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop,
                                 ss.id_usu_recibe, us.nmbre_usrio as solicitante,
                                 ss.id_usu_tecnico_asig, u.nmbre_usrio as tecnico,
                                 ss.id_direccion, d.nmbre_dprtmnto as direccion,
                                 ss.fecha_ini, ss.fecha_fin, ss.solucion')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_recibe')
            ->where('numero_sop', $request->numero_sop)
            ->first();

        return response()->json(['status' => MsgStatus::Success, 'soporte' => $soporte], 200);
    }

    public function asignarSoporte(SoporteAsignarcionRequest $request, int $id_sop): JsonResponse
    {
        try {
            $soporte = Soporte::find($id_sop);

            if (!$soporte) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => MsgStatus::SoporteNotFound
                ], 404);
            }

            // Consolidar todos los datos antes del update
            $data = $request->validated();
            $data['id_usu_tecnico'] = $request->id_usu_tecnico_asig;
            $data['id_estado'] = 5;
            $data['fecha_asig'] = now();

            $soporte->update($data);

            // Cargar información para el correo y telegram
            $asignacion = Soporte::from('sop_soporte as ss')
                ->selectRaw('ss.id_sop, ss.numero_sop,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_tecnico_asig, u.nmbre_usrio as tecnico, u.email as email_tecnico,
                        u.telegram_chat_id, u.notificar_telegram,
                        ss.id_usu_recibe, us.nmbre_usrio as solicitante, us.email as email_solicitante,
                        ss.incidente, ss.fecha_ini,
                        sat.nombre as area_tic')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
                ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_tecnico_asig')
                ->join('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_recibe')
                ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
                ->where('ss.id_sop', $id_sop)
                ->first();

            if ($asignacion) {
                // ENVIAR NOTIFICACIÓN A TELEGRAM
                $this->telegramService->notificarSoporteAsignado($asignacion);

                // Enviar correo al técnico
                if (!empty($asignacion->email_tecnico)) {
                    Mail::to($asignacion->email_tecnico)->send(new TecnicoMail($asignacion));
                }

                // Enviar correo al solicitante
                if (!empty($asignacion->email_solicitante)) {
                    Mail::to($asignacion->email_solicitante)->send(new UsuarioMail($asignacion));
                }
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::SoporteAsignado
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Error al asignar soporte: ' . $th->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    function anularSoportes(AnularSoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->fill($request->validated());
                $soporte->id_calificacion = 3;
                $soporte->id_estado = 2;
                $soporte->save();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::SoporteAnulado], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function getSoporteAnulados(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.anio, ss.numero_sop,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.fecha_ini, ss.incidente, ss.obs_anulado,
                        ss.id_area_tic, sat.nombre as area_tic,
                        ss.id_estado, se.nombre as estado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->where('ss.id_estado', 2)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        if (sizeof($soportes) >= 1) {
            return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoportesAnuladosNotFound], 404);
        }
    }

    public function crearSolicitudAdmin(SolicitudAdminRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            // Crear solicitud
            $soporte = Soporte::create($data);

            // Si se asigna técnico
            if (!empty($request->id_usu_tecnico_asig)) {
                $soporte->id_estado = 5;
                $soporte->fecha_asig = now();
                $soporte->save();

                // Obtener datos de asignación en una sola consulta
                $asignacion = DB::table('sop_soporte as ss')
                    ->selectRaw('ss.id_sop, ss.numero_sop,
                             ss.id_direccion, d.nmbre_dprtmnto as direccion,
                             ss.id_usu_tecnico_asig, ut.nmbre_usrio as tecnico, ut.email as email_tecnico,
                             ut.telegram_chat_id, ut.notificar_telegram,
                             ss.id_usu_recibe, ur.nmbre_usrio as solicitante, ur.email as email_solicitante,
                             ss.incidente, ss.fecha_ini,
                             sat.nombre as area_tic')
                    ->join('dprtmntos as d', 'd.cdgo_dprtmnto', '=', 'ss.id_direccion')
                    ->join('usrios_sstma as ut', 'ut.cdgo_usrio', '=', 'ss.id_usu_tecnico_asig')
                    ->join('usrios_sstma as ur', 'ur.cdgo_usrio', '=', 'ss.id_usu_recibe')
                    ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
                    ->where('ss.id_sop', $soporte->id_sop)
                    ->first();

                if ($asignacion) {

                    // ENVIAR NOTIFICACIÓN A TELEGRAM
                    $this->telegramService->notificarSoporteAsignado($asignacion);

                    // Enviar correos
                    if (!empty($asignacion->email_solicitante)) {
                        Mail::to($asignacion->email_solicitante)->send(new UsuarioMail($asignacion));
                    }

                    if (!empty($asignacion->email_tecnico)) {
                        Mail::to($asignacion->email_tecnico)->send(new TecnicoMail($asignacion));
                    }

                }
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::Created
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Error al crear solicitud: ' . $th->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    function updateSoporte(SoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }


    /* REPORTES: INDICADORES */
    function getIndicadoresSoportes(Request $request): JsonResponse
    {
        $desempenoForEstados = DB::select('CALL sop_get_desempeno_for_estados(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForAreas = DB::select('CALL sop_get_desempeno_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForTecnicos = DB::select('CALL sop_get_desempeno_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForAreas = DB::select('CALL sop_get_efectividad_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForTecnicos = DB::select('CALL sop_get_efectividad_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $sumaDiasHabiles = DB::select('CALL sop_get_dias_habiles(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $promedioCalificacion = DB::select('CALL sop_promedio_calificacion_por_fecha(?,?)', [$request->fecha_inicio, $request->fecha_fin]);

        /* SUMATORIA DE TOTAL DE CASOS EN DESEMPEÑO */
        $sumaDesempenoForEstados = 0;
        if (sizeof($desempenoForEstados) > 0) {
            foreach ($desempenoForEstados as $total_estados) {
                $sumaDesempenoForEstados += $total_estados->total_estados;
            }
        }

        return response()->json([
            'status' => MsgStatus::Success,
            'desempenoForEstados' => $desempenoForEstados,
            'sumaDesempenoForEstados' => $sumaDesempenoForEstados,
            'desempenoForAreas' => $desempenoForAreas,
            'desempenoForTecnicos' => $desempenoForTecnicos,
            'efectividadForAreas' => $efectividadForAreas,
            'efectividadForTecnicos' => $efectividadForTecnicos,
            'sumaDiasHabiles' => $sumaDiasHabiles,
            'promedioCalificacion' => $promedioCalificacion,
        ], 200);
    }

    function exportPDFIndicadores(Request $request)
    {
        $desempenoForEstados = DB::select('CALL sop_get_desempeno_for_estados(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForAreas = DB::select('CALL sop_get_desempeno_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForTecnicos = DB::select('CALL sop_get_desempeno_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForAreas = DB::select('CALL sop_get_efectividad_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForTecnicos = DB::select('CALL sop_get_efectividad_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $sumaDiasHabiles = DB::select('CALL sop_get_dias_habiles(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $promedioCalificacion = DB::select('CALL sop_promedio_calificacion_por_fecha(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $usuarioGenerador = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio as generador, nc.nom_cargo as cargo_generador,
                                        u.nmbre_usrio as director, ncd.nom_cargo as cargo_director')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'd.id_jefe')
            ->join('nom_cargo as ncd', 'ncd.idnom_cargo', 'u.crgo_id')
            ->where('us.cdgo_usrio', auth()->id())->first();

        /* SUMATORIA DE TOTAL DE CASOS EN DESEMPEÑO */
        $sumaDesempenoForEstados = 0;
        if (sizeof($desempenoForEstados) > 0) {
            foreach ($desempenoForEstados as $total_estados) {
                $sumaDesempenoForEstados += $total_estados->total_estados;
            }
        }

        $data = [
            'direccion' => 'Dirección de Técnologias de Información y Comunicación',
            'titulo' => 'Reporte General de Indicadores',
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'desempenoForEstados' => $desempenoForEstados,
            'sumaDesempenoForEstados' => $sumaDesempenoForEstados,
            'desempenoForAreas' => $desempenoForAreas,
            'desempenoForTecnicos' => $desempenoForTecnicos,
            'efectividadForAreas' => $efectividadForAreas,
            'efectividadForTecnicos' => $efectividadForTecnicos,
            'sumaDiasHabiles' => $sumaDiasHabiles,
            'promedioCalificacion' => $promedioCalificacion,
            'usuarioGenerador' => $usuarioGenerador,
            'chartTecnicosImage' => $request->chart_tecnicos_image,
            'chartAreasImage' => $request->chart_areas_image,
        ];
        $pdf = Pdf::loadView('pdf.soporte.indicador', $data);
        return $pdf->setPaper('a4', 'portrait')->download('indicador.pdf');
        /* return response()->json(['status' => MsgStatus::Success, 'data' => $data]); */
    }

    function getSoportesSinCalificacion(): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop, ss.fecha_ini,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.id_estado', 3)
            ->where('ss.id_calificacion', 3)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }

    function setCalificacionSoportes(Request $request): JsonResponse
    {
        Soporte::whereIn('id_sop', [$request->id_soportes])->update(['id_calificacion' => 5, 'id_estado' => 4]);

        return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 200);
    }

    /* function exportActaBajaEquipo(Request $soporte)
    {
        //$soporteActa = $this->getSoporteForNumero($soporte);

        $data = [
            'direccion'     =>  'Dirección de Técnologias de Información y Comunicación',
            'titulo'        =>  'Reporte General de Indicadores',
            'fecha'         =>   Carbon::now()->format('Y-m-d'),
            'soporte'       =>   $soporte
        ];

        $pdf = Pdf::loadView('pdf.soporte.acta', $data);
        return $pdf->setPaper('a4', 'portrait')->download('acta.pdf');
    } */
}
