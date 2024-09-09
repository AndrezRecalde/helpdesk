<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\TipoCategoriaRequest;
use App\Models\InvTipocategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TipoCategoriaController extends Controller
{
    function getTiposCategorias(): JsonResponse
    {
        $tipos_categorias = InvTipocategoria::get(['id', 'nombre_tipocategoria']);

        return response()->json([
            'status' => MsgStatus::Success,
            'tipos_categorias' => $tipos_categorias
        ]);
    }

    function store(TipoCategoriaRequest $request): JsonResponse
    {
        try {
            InvTipocategoria::create($request->validated());
            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(TipoCategoriaRequest $request, int $id): JsonResponse
    {
        $tipo_categoria = InvTipocategoria::find($id);
        try {
            if ($tipo_categoria) {
                $tipo_categoria->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $tipo_categoria = InvTipocategoria::find($id);
        try {
            if ($tipo_categoria) {
                $tipo_categoria->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Deleted], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
