<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\DiagnosticoRequest;
use App\Http\Requests\SolicitudRequest;
use App\Http\Requests\SoporteRequest;
use App\Models\Departamento;
use App\Models\Soporte;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SoporteController extends Controller
{
    function getSoportesActuales(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.anio, ss.numero_sop,
                            ss.id_direccion, d.nmbre_dprtmnto as direccion,
                            ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                            ss.fecha_ini, ss.incidente,
                            ss.id_area_tic, sat.nombre as area_tic,
                            ss.id_tipo_soporte, sts.nombre as tipo_soporte,
                            ss.id_estado, se.nombre as estado, se.color,
                            ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->leftJoin('sop_tipo_soporte as sts', 'sts.id_tipo_soporte', 'ss.id_tipo_soporte')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")
            ->where('ss.id_estado', '<>', 2)
            ->tecnico($request->id_usu_tecnico_asig)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }

    function getSoportesAtendidosForUsuario(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop, ss.incidente, ss.solucion,
                            ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.id_estado', 3)
            ->usuario($request->id_usu_recibe)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }

    function cierreSoporteForUsuario(Request $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->id_calificacion = $request->id_calificacion;
                $soporte->id_estado = $request->id_estado;
                $soporte->save();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::SoporteClosed], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function searchSoportes(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.anio, ss.numero_sop, ss.solucion,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.fecha_ini, ss.fecha_fin, ss.incidente, ss.numero_escrito,
                        ss.id_tipo_solicitud, stsol.nombre as tipo_solicitud,
                        ss.id_area_tic, sat.nombre as area_tic,
                        ss.id_estado, se.nombre as estado, se.color,
                        ss.id_tipo_soporte, sts.nombre as tipo_soporte,
                        ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado,
                        ss.id_equipo, seq.sop_equipo_codigo, seq.sop_equipo_serie')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->join('sop_tipo_soporte as sts', 'sts.id_tipo_soporte', 'ss.id_tipo_soporte')
            ->join('sop_tipo_solicitud as stsol', 'stsol.id_tipo_solic', 'ss.id_tipo_solicitud')
            ->leftJoin('sop_equipo as seq', 'seq.idsop_equipo', 'ss.id_equipo')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->direccion($request->id_direccion)
            ->numero($request->numero_sop)
            ->tecnico($request->id_usu_tecnico_asig)
            ->estado($request->id_estado)
            ->where('ss.anio', $request->anio)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        if (sizeof($soportes) >= 1) {
            return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No hay soportes con esos filtros de búsqueda'], 404);
        }
    }

    function buscarSoporteLite(): JsonResponse
    {
        $anioActual = Carbon::now()->year; // Obtiene el año actual
        $soportes = Soporte::where('anio', $anioActual)
            ->whereIn('id_estado', [3, 4])
            ->orderBy(
                'id_sop',
                'DESC')
            ->take(200)
            ->get(['id_sop', 'numero_sop']);

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }

    function createSoporte(SoporteRequest $request): JsonResponse
    {
        try {
            $soporte = Soporte::create($request->validated());
            $soporte->id_calificacion = 3;
            $soporte->save();
            return response()->json([
                'status' => 'success',
                'msg' => 'Soporte creado con éxito',
                'numero_sop' => $soporte->numero_sop
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    /* Solicitud de Soporte - Usuario */
    function enviarSolicitud(SolicitudRequest $request): JsonResponse
    {
        try {
            $soporte = Soporte::create($request->validated());
            $soporte->id_direccion = Auth::user()->cdgo_direccion;
            $soporte->id_usu_recibe = Auth::user()->cdgo_usrio;
            $soporte->save();
            return response()->json(['status' => 'success', 'msg' => MsgStatus::SoporteSendSuccess], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function diagnosticarSoporte(DiagnosticoRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->fill($request->validated());
                $soporte->id_estado = 3; // Estado: Atendido
                $soporte->save();

                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg'    => MsgStatus::SoporteDiagnosed
                ], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function exportPDFCardSoporte(Request $request)
    {
        $soporte = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.anio, ss.numero_sop,
                                 ss.numero_escrito, ss.fecha_ini, ss.fecha_fin,
                                 stsol.nombre as tipo_solicitud,
                                 d.nmbre_dprtmnto as direccion,
                                 us.nmbre_usrio as usuario_recibe,
                                 sts.nombre as tipo_soporte,
                                 ss.incidente, ss.solucion,
                                 sat.nombre as area_tic,
                                 se.nombre as estado,
                                 usua.nmbre_usrio as tecnico_asignado,
                                 ss.cod_barra, seq.sop_equipo_codigo as codigo_equipo')
            ->join('sop_tipo_solicitud as stsol', 'stsol.id_tipo_solic', 'ss.id_tipo_solicitud')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('sop_tipo_soporte as sts', 'sts.id_tipo_soporte', 'ss.id_tipo_soporte')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as usua', 'usua.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->leftJoin('sop_equipo as seq', 'seq.idsop_equipo', 'ss.id_equipo')
            ->where('ss.id_sop', $request->id_sop)
            ->first();

        if ($soporte) {
            $data = [
                'titulo'      => 'Registro de Soporte al Usuario',
                'institucion' => 'Gobierno Autónomo Descentralizado Provincial de Esmeraldas',
                'direccion'   => 'Dirección de Tecnologías de Información y Comunicación (TIC)',
                'soporte'     => $soporte
            ];
            $pdf = Pdf::loadView('pdf.soporte.soporte', $data);
            return $pdf->setPaper('a4', 'portrait')->download('soporte.pdf');
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
        }
    }

    function exportActividadesSoportes(Request $request)
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop, ss.fecha_ini,
                                 ss.incidente, ss.solucion,
                                 us.nmbre_usrio as tecnico, nc.nom_cargo as cargo_tecnico,
                                 u.nmbre_usrio as usuario_recibe')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->leftJoin('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftjoin('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->tecnico($request->cdgo_usrio)
            ->orderBy('ss.fecha_ini', 'ASC')
            ->get();

        $jefe_departamento = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, us.nmbre_usrio as jefe, nc.nom_cargo as cargo_jefe')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->where('d.cdgo_dprtmnto', 22)
            ->first();

        if (sizeof($soportes) > 0) {
            $data = [
                'direccion'    => 'Dirección de Técnologias de la Información y Comunicación',
                'titulo'       => 'Informe de Actividades por Servidor',
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin'    => (new Carbon($request->fecha_fin))->addDays(-1)->format('Y-m-d'),
                'soportes'     => $soportes,
                'jefe_departamento' => $jefe_departamento
            ];
            $pdf = Pdf::loadView('pdf.soporte.reporte_soportes', $data);
            return $pdf->setPaper('a4', 'portrait')->download('reporte_soportes.pdf');
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::SoporteNotFound], 404);
        }
    }

    function getActividadesSoportes(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop, ss.fecha_ini,
                                 ss.incidente, ss.solucion,
                                 us.nmbre_usrio as tecnico, nc.nom_cargo as cargo_tecnico,
                                 u.nmbre_usrio as usuario_recibe')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->leftJoin('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->tecnico($request->cdgo_usrio)
            ->orderBy('ss.fecha_ini', 'ASC')
            ->get();

        if (sizeof($soportes) > 0) {
            return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::ActivitiesSoportedNotFound], 404);
        }
    }


    /* Controlador para las consultas de los Usuarios finales */
    function getSoportesActualesForUser(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop,
                        ss.fecha_ini, ss.incidente, ss.solucion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.id_estado, se.nombre as estado, se.color,
                        ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")
            ->where('ss.id_usu_recibe', $request->cdgo_usrio)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }

    function getSoportesAnualesForUser(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop,
                        ss.fecha_ini, ss.incidente, ss.solucion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.id_estado, se.nombre as estado, se.color,
                        ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.anio', Carbon::now()->format('Y'))
            ->where('ss.id_usu_recibe', $request->cdgo_usrio)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'soportes' => $soportes], 200);
    }
}
