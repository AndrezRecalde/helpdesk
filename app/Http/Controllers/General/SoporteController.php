<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\Soporte;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
                            ss.id_estado, se.nombre as estado,
                            ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")
            ->tecnico($request->id_usu_tecnico_asig)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
    }

    function searchSoportes(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soportes as ss')
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
}
