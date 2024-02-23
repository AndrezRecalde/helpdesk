<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\SoporteRequest;
use App\Mail\SoporteMail;
use App\Models\Soporte;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SoporteController extends Controller
{
    function assignSoporte(SoporteRequest $request): JsonResponse
    {
        try {
            Soporte::create($request->validated());

            //BUSCA AL TECNICO DE TICS
            $tecnico = User::from('usrios_sstma as u')
                    ->selectRaw('u.cdgo_usrio, u.email')
                    ->join('model_has_roles as mh', 'mh.model_id','u.cdgo_usrio')
                    ->where('u.cdgo_usrio', $request->tecnico_id)
                    ->first();

            //SE ENVÍA AL CORREO AL TECNICO
            Mail::to($tecnico->email)->queue(new SoporteMail($request));


            return response()->json(['status' => 'success', 'msg' => 'Soporte Asignado'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function getSoportes(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sw_soportes sop')
            ->selectRaw('sop.id, sop.retrospectiva')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'sop.tecnico_id')
            ->join('sop_areas_tic as sa', 'sa.id_areas_tic', 'sop.area_id')
            ->join('sop_estado as se', 'se.id_estado_caso', 'sop.estado_id')
            ->join('sop_tipo_soporte as stp', 'stp.id_tipo_soporte', 'sop.tipo_soporte_id')
            ->join('sw_solicitud as ss', 'ss.id', 'sop.solicitud_id')
            ->tecnico($request->tecnico_id)
            ->fecha($request->fecha)
            ->estado($request->estado)
            ->get();

        return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
    }
}
