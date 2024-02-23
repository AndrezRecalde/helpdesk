<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\SolicitudRequest;
use App\Http\Requests\SolicitudStatus;
use App\Models\Solicitud;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    function getSolicitudesGerente(Request $request): JsonResponse
    {
        $solicitudes = Solicitud::from('sw_solicitudes as ss')
            ->selectRaw('ss.id, ss.solicitud, ss.fecha_solicitud,
                                   u.cdgo_usrio, u.nmbre_usrio as usuario,
                                   d.cdgo_dprtmnto, d.nmbre_dprtmnto, ss.leido')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'd.usuario_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.departamento_id')
            ->fecha($request->fecha_solicitud)
            ->get();

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
                'msg' => 'Creado con éxito'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', '' => $th->getMessage()], 500);
        }
    }

    function update(SolicitudRequest $request, int $id): JsonResponse
    {
        $solicitud = Solicitud::find($id);
        try {
            if ($solicitud) {
                $solicitud->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Error no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function updateStatus(SolicitudStatus $request, int $id): JsonResponse
    {
        $solicitud = Solicitud::find($id);
        try {
            $solicitud->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Solicitud leída'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $solicitud = Solicitud::find($id);
        try {
            $solicitud->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
