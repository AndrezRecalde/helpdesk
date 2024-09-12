<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EstadoInvRequest;
use App\Models\InvEstado;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvEstadoController extends Controller
{
    function getEstadosInv(): JsonResponse
    {
        $estados = InvEstado::get(['id', 'nombre_estado']);

        return response()->json([
            'status' => MsgStatus::Success,
            'estados' => $estados
        ]);
    }

    function store(EstadoInvRequest $request): JsonResponse
    {
        try {
            InvEstado::create($request->validated());
            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(EstadoInvRequest $request, int $id): JsonResponse
    {
        $estado = InvEstado::find($id);
        try {
            if ($estado) {
                $estado->update($request->validated());
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
        $estado = InvEstado::find($id);
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
