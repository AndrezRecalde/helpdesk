<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AnularSoporteRequest;
use App\Http\Requests\SoporteRequest;
use App\Mail\SoporteMail;
use App\Models\Soporte;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class SoporteAdminController extends Controller
{

    //SE ENVÍA AL CORREO AL TECNICO
    //Mail::to($tecnico->email)->queue(new SoporteMail($request));

    function asignarSoporte(SoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {

            if ($soporte) {
                $soporte->update($request->validated());
                $soporte->id_usu_tecnico = $request->id_usu_tecnico_asig;
                $soporte->id_estado = 5;
                $soporte->fecha_asig = Carbon::now();
                $soporte->save();

                $tecnico = User::where("cdgo_usrio", $request->id_usu_tecnico_asig)
                    ->first(['cdgo_usrio', 'email']);

                $soporte_asignado = Soporte::from('sop_soporte as ss')
                    ->selectRaw('ss.id_sop, ss.numero_sop,
                    ss.id_direccion, d.nmbre_dprtmnto as direccion,
                    ss.id_usu_tecnico_asig, u.nmbre_usrio as tecnico,
                    ss.id_usu_recibe, us.nmbre_usrio as solicitante, us.email,
                    ss.incidente, ss.fecha_ini')
                    ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
                    ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_tecnico_asig')
                    ->join('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_recibe')
                    ->where('ss.id_sop', $id_sop)
                    ->first();

                Mail::to($tecnico->email)->send(new SoporteMail($soporte_asignado));
                return response()->json(['status' => 'success', 'msg' => 'Soporte Asignado'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function anularSoportes(AnularSoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Soporte anulado'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
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
                return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'No existen soportes anulados en ese rango de fechas'], 404);
            }
    }
}
