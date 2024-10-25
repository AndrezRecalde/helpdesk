<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\InvPerifericoRequest;
use App\Http\Requests\InvPerifericoTransferRequest;
use App\Models\InvPeriferico;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class InvPerifericoController extends Controller
{
    function getInvPerifericos(Request $request): JsonResponse
    {
        $perifericos = InvPeriferico::from('inv_perifericos as invper')
            ->selectRaw('invper.id, invper.modelo, invper.numero_serie,
                                     invper.fecha_adquisicion, invper.es_adquirido,
                                     invper.es_donado, invper.es_usado,
                                     invper.marca_id, inv.nombre_marca,
                                     invper.categoria_id, invc.nombre_categoria,
                                     invper.equipo_id, inve.codigo_nuevo,
                                     invper.estado_id, inves.nombre_estado')
            ->join('inv_marcas as invc', 'invc.id', 'invper.marca_id')
            ->join('inv_categorias as invc', 'invc.id', 'invper.categoria_id')
            ->join('inv_estados as inves', 'inves.id', 'invper.estado_id')
            ->leftJoin('inv_equipos as inve', 'inve.id', 'invper.equipo_id')
            ->byEquipoId($request->equipo_id)
            ->byNumeroSerie($request->numero_serie)
            ->byEstadoId($request->estado_id)
            ->get();

        return response()->json([
            'status'      => MsgStatus::Success,
            'perifericos' => $perifericos
        ], 200);
    }

    function transferPeriferico(InvPerifericoTransferRequest $request, int $id): JsonResponse
    {
        $periferico = InvPeriferico::find($id);
        try {
            if ($periferico) {
                $periferico->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function update(InvPerifericoRequest $request, int $id): JsonResponse
    {
        $periferico = InvPeriferico::find($id);
        try {
            if ($periferico) {
                $periferico->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }
}
