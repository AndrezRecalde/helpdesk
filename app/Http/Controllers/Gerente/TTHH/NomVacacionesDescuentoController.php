<?php

namespace App\Http\Controllers\Gerente\TTHH;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\NomVacacionesDescuentoRequest;
use App\Models\NomPeriodoVacacional;
use App\Models\NomVacacionesDescuento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NomVacacionesDescuentoController extends Controller
{
    function getNomVacacionesDescuentos(Request $request): JsonResponse
    {
        try {
            $descuentos = NomVacacionesDescuento::from('nom_vacaciones_descuentos as nvd')
                ->join('usrios_sstma as us', 'nvd.usuario_id', '=', 'us.cdgo_usrio')
                ->join('usrios_sstma as u', 'nvd.usuario_tthh', '=', 'u.cdgo_usrio')
                ->join('nom_periodo_vacacionales as npv', 'nvd.nom_periodo_vacacional_id', '=', 'npv.id')
                ->select(
                    'nvd.id',
                    'us.nmbre_usrio',
                    'us.usu_ci',
                    'npv.anio',
                    'nvd.dias_descuento',
                    'nvd.motivo',
                    'nvd.usuario_tthh',
                    'u.nmbre_usrio as usuario_tthh_name',
                )
                ->when($request->usuario_id, fn($q) => $q->where('nvd.usuario_id', $request->usuario_id))
                ->when($request->anio, fn($q) => $q->where('npv.anio', $request->anio))
                ->orderBy('nvd.id', 'desc')
                ->orderBy('npv.anio', 'desc')
                ->get();

            return response()->json([
                'status'      => MsgStatus::Success,
                'descuentos' => $descuentos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function store(NomVacacionesDescuentoRequest $request): JsonResponse
    {
        $periodo = NomPeriodoVacacional::find($request->nom_periodo_vacacional_id);

        if (!$periodo) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => MsgStatus::NotFound
            ], 404);
        }

        $diasDescuento = $request->dias_descuento;
        $diasDisponibles = $periodo->dias_disponibles;

        if ($diasDescuento > $diasDisponibles) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => 'Los días de descuento no pueden ser mayores a los días disponibles del periodo vacacional.'
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Actualizar el periodo vacacional
            $periodo->update([
                'dias_tomados'     => $periodo->dias_tomados + $diasDescuento,
                'dias_disponibles' => max($diasDisponibles - $diasDescuento, 0),
            ]);

            // Crear el descuento
            NomVacacionesDescuento::create(array_merge(
                $request->validated(),
                ['usuario_tthh' => Auth::id()]
            ));

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::Created,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => 'Error al registrar el descuento: ' . $e->getMessage()
            ], 500);
        }
    }

    function update(NomVacacionesDescuentoRequest $request, int $id): JsonResponse
    {
        $descuento = NomVacacionesDescuento::find($id);
        try {
            if ($descuento) {
                $descuento->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $descuento = NomVacacionesDescuento::find($id);
        try {
            if ($descuento) {
                $descuento->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Deleted], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
