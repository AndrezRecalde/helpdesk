<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\InvInmuebleRequest;
use App\Models\InvInmueble;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvInmuebleController extends Controller
{
    function getInvInmuebles(): JsonResponse
    {
        $inmuebles = InvInmueble::get(['id', 'nombre_inmueble']);

        return response()->json([
            'status' => MsgStatus::Success,
            'inmuebles' => $inmuebles
        ], 200);
    }

    function store(InvInmuebleRequest $request): JsonResponse
    {
        try {
            InvInmueble::create($request->validated());
            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(InvInmuebleRequest $request, int $id): JsonResponse
    {
        $inmueble = InvInmueble::find($id);
        try {
            if ($inmueble) {
                $inmueble->update($request->validated());
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
        $estado = InvInmueble::find($id);
        try {
            if ($estado) {
                $estado->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
