<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UbicacionInvRequest;
use App\Models\InvUbicacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UbicacionInvController extends Controller
{
    function getUbicacionesInv(): JsonResponse
    {
        $ubicaciones = InvUbicacion::get(['id', 'nombre_edificio', 'nombre_ubicacion']);

        return response()->json([
            'status' => MsgStatus::Success,
            'ubicaciones' => $ubicaciones
        ]);
    }

    function store(UbicacionInvRequest $request): JsonResponse
    {
        try {
            InvUbicacion::create($request->validated());
            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(UbicacionInvRequest $request, int $id): JsonResponse
    {

        $ubicacion = InvUbicacion::find($id);

        try {
            if ($ubicacion) {
                $ubicacion->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $ubicacion = InvUbicacion::find($id);

        try {
            if ($ubicacion) {
                $ubicacion->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
