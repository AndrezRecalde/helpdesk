<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ConceptoInvRequest;
use App\Models\InvConcepto;
use Illuminate\Http\JsonResponse;

class InvConceptoController extends Controller
{
    function getInvConceptos(): JsonResponse
    {
        $conceptos = InvConcepto::get(['id', 'nombre_concepto']);
        return response()->json([
            'status' => MsgStatus::Success,
            'conceptos' => $conceptos
        ]);
    }

    function store(ConceptoInvRequest $request): JsonResponse
    {
        try {
            InvConcepto::create($request->validated());

            return response()->json([
                'status' => 'success',
                'msg' => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(ConceptoInvRequest $request, int $id): JsonResponse
    {
        $concepto = InvConcepto::find($id);
        try {
            if ($concepto) {
                $concepto->update($request->validated());
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
        $concepto = InvConcepto::find($id);
        try {
            if ($concepto) {
                $concepto->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
