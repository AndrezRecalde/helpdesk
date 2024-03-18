<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\DiagnosticoRequest;
use App\Http\Requests\SolicitudRequest;
use App\Http\Requests\SoporteRequest;
use App\Models\Soporte;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
                            ss.id_estado, se.nombre as estado, se.color,
                            ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")
            ->where('ss.id_estado', '<>', 2)
            ->tecnico($request->id_usu_tecnico_asig)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
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
            ->where('ss.anio', $request->anio)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        if (sizeof($soportes) >= 1) {
            return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No hay soportes con esos filtros de búsqueda'], 404);
        }
    }

    function createSoporte(SoporteRequest $request): JsonResponse
    {
        try {
            $soporte = Soporte::create($request->validated());
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
            return response()->json(['status' => 'success', 'msg' => 'Solicitud enviada con éxito'], 200);
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
                    'status' => 'success',
                    'msg' => 'Soporte Diagnosticado'
                ], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
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
            return response()->json(['status' => 'error', 'msg' => 'No existe el soporte registrado'], 500);
        }
    }
}
