<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Http\Requests\InvPerifericoEquipoRequest;
use Carbon\Carbon;
use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\InvPerifericoRequest;
use App\Http\Requests\InvPerifericoTransferRequest;
use App\Models\InvPeriferico;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class InvPerifericoController extends Controller
{
    function getInvPerifericos(Request $request): JsonResponse
    {
        $perifericos = InvPeriferico::from('inv_perifericos as invper')
            ->selectRaw('invper.id, invper.nombre_periferico, invper.numero_serie,
                                     invper.fecha_adquisicion, invper.es_adquirido,
                                     invper.es_donado, invper.es_usado,
                                     invper.marca_id, invm.nombre_marca,
                                     invc.tipocategoria_id,
                                     invper.categoria_id, invc.nombre_categoria,
                                     invper.equipo_id, inve.codigo_nuevo,
                                     invper.estado_id, inves.nombre_estado, inves.color')
            ->with([
                'equipo:id,codigo_nuevo,numero_serie'
            ])
            ->join('inv_marcas as invm', 'invm.id', 'invper.marca_id')
            ->join('inv_categorias as invc', 'invc.id', 'invper.categoria_id')
            //->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
            ->join('inv_estados as inves', 'inves.id', 'invper.estado_id')
            ->leftJoin('inv_equipos as inve', 'inve.id', 'invper.equipo_id')
            ->byCodigoEquipo($request->codigo_equipo)
            ->byNumeroSerie($request->numero_serie)
            ->byMarcaId($request->marca_id)
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

    function store(InvPerifericoRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();  // Iniciar transacción
            InvPeriferico::create($request->validated());
            DB::commit();  // Confirmar la transacción si todo sale bien

            return response()->json([
                'status' => 'success',
                'msg'    => MsgStatus::Created,
            ], 200);
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

    function assignEquipo(InvPerifericoEquipoRequest $request, int $id): JsonResponse
    {
        $periferico = InvPeriferico::find($id);
        try {
            if ($periferico) {
                $periferico->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::AssignEquipoSuccess], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    public function clearEquipoIdById($id)
    {
        // Buscar el periférico por ID
        $periferico = InvPeriferico::find($id);

        // Verificar si el periférico existe
        if (!$periferico) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => 'El periférico no fue encontrado.'
            ], 404);
        }

        // Actualizar el equipo_id a null
        $periferico->equipo_id = null;
        $periferico->save();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => 'El equipo se desvinculó',
        ]);
    }

    function exportPDFPerifericos(Request $request)
    {
        if (sizeof($request->componentes) >= 1) {
            $data = [
                'title' => 'Informe de reporte de Componentes',
                'componentes' => $request->componentes,
                'current_fecha' => Carbon::now()->format('Y-m-d')
            ];
            $pdf = Pdf::loadView('pdf.componentes.reporte', $data);
            return $pdf->setPaper('a4', 'landscape')->download('componentes.pdf');
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
        }
    }
}
