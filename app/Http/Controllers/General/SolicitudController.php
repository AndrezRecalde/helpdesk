<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\SolicitudRequest;
use App\Models\Solicitud;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    function getSolicitudes(): JsonResponse
    {
        $solicitudes = Solicitud::from('sw_solicitudes as ss')
            ->selectRaw('ss.id, ss.solicitud, ss.num_solicitud, ss.fecha_solicitud,
                                    u.cdgo_usrio, u.nmbre_usrio as usuario,
                                    d.cdgo_dprtmnto, d.nmbre_dprtmnto as departamento,
                                    ss.leido')
            ->leftJoin('usrios_sstma as u', 'u.cdgo_usrio', 'ss.usuario_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.departamento_id')
            ->allowed();

        return response()->json(['status' => 'success', 'solicitudes' => $solicitudes], 200);
    }

    function store(SolicitudRequest $request): JsonResponse
    {
        try {
            $solicitud = Solicitud::create($request->validated());
            $solicitud->num_solicitud = Carbon::now()->toDateTimeString();
            $solicitud->save();
            return response()->json([
                'status' => 'success',
                'solicitud' => $solicitud,
                'msg' => 'Solicitud enviada con éxito'
            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
