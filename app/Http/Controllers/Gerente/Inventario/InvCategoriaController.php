<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoriaRequest;
use App\Http\Requests\StatusRequest;
use App\Models\InvCategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvCategoriaController extends Controller
{
    function getCategorias(Request $request): JsonResponse
    {
        $categorias = InvCategoria::from('inv_categorias as invc')
            ->selectRaw('invc.id, invc.nombre_categoria,
                        invt.nombre_tipocategoria, invc.tipocategoria_id, invc.activo')
            ->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
            ->byTipocategoriaId($request->tipocategoria_id)
            ->activo($request->activo)
            ->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'categorias' => $categorias
        ]);
    }

    function store(CategoriaRequest $request): JsonResponse
    {
        try {
            InvCategoria::create($request->validated());
            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(CategoriaRequest $request, int $id): JsonResponse
    {
        $categoria = InvCategoria::find($id);
        try {
            if ($categoria) {
                $categoria->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function updateStatus(StatusRequest $request, int $id): JsonResponse
    {
        $categoria = InvCategoria::find($id);
        try {
            if ($categoria) {
                $categoria->update($request->validated());
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
        $categoria = InvCategoria::find($id);
        try {
            if ($categoria) {
                $categoria->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
