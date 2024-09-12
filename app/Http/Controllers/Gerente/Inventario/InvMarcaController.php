<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\MarcaInvRequest;
use App\Models\InvMarca;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvMarcaController extends Controller
{
    function getMarcasInv(): JsonResponse
    {
        $marcas = InvMarca::get(['id', 'nombre_marca']);

        return response()->json([
            'status' => MsgStatus::Success,
            'marcas' => $marcas
        ]);
    }

    function store(MarcaInvRequest $request): JsonResponse
    {
        try {
            InvMarca::create($request->validated());
            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(MarcaInvRequest $request, int $id): JsonResponse
    {
        $marca = InvMarca::find($id);
        try {
            if ($marca) {
                $marca->update($request->validated());
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
        $marca = InvMarca::find($id);
        try {
            if ($marca) {
                $marca->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
