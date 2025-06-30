<?php

namespace App\Http\Controllers\Gerente\TTHH;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\NomPeriodoVacacionesRequest;
use App\Models\NomPeriodoVacacional;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NomPeriodoVacacionesController extends Controller
{
    function getConsultarPeriodos(Request $request): JsonResponse
    {
        try {
            $periodos = NomPeriodoVacacional::from('nom_periodo_vacacionales as npv')
                ->select('npv.id', 'npv.dias_total', 'npv.dias_tomados', 'npv.dias_disponibles', 'npv.anio')
                ->byUsuarioId($request->cdgo_usrio)
                ->orderBy('npv.anio', 'DESC')
                ->get();

            return response()->json([
                'status' => MsgStatus::Success,
                'periodos' => $periodos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function obtenerDiasDisponiblesPorUsuario($cdgo_usrio): JsonResponse
    {
        $periodos = NomPeriodoVacacional::from('nom_periodo_vacacionales as npv')
            ->select('us.nmbre_usrio', 'npv.anio', DB::raw('SUM(npv.dias_disponibles) as total_dias'))
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'npv.cdgo_usrio')
            ->byUsuarioId($cdgo_usrio)
            ->byAnio($request->anio ?? date('Y')) // Si no se proporciona un año, usar el actual
            ->groupBy('anio')
            ->orderBy('anio', 'desc')
            ->get();

        $totalDiasDisponibles = $periodos->sum('total_dias'); // Sumar todos los días disponibles

        return response()->json([
            'status' => MsgStatus::Success,
            'total_dias_disponibles' => $totalDiasDisponibles,
            'detalle_por_periodo' => $periodos
        ]);
    }

    public function store(NomPeriodoVacacionesRequest $request): JsonResponse
    {
        try {
            $cdgo_usrio = $request->cdgo_usrio;
            $anios = $request->anios;
            $creados = [];

            foreach ($anios as $anio) {
                $existe = NomPeriodoVacacional::where('cdgo_usrio', $cdgo_usrio)
                    ->where('anio', $anio)
                    ->exists();

                if (!$existe) {
                    $periodo = NomPeriodoVacacional::create([
                        'cdgo_usrio' => $cdgo_usrio,
                        'anio' => $anio,
                        //'dias_total' => 30,
                        //'dias_tomados' => 0,
                        //'dias_disponibles' => 30,
                        //'activo' => true,
                    ]);
                    $creados[] = $periodo;
                }
            }

            if (count($creados) === 0) {
                return response()->json([
                    'status' => MsgStatus::Info,
                    'msg'    => MsgStatus::InfoPeriodos,
                ], 200);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::PeriodosCreated,
                'data'   => $creados
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }

    function update(NomPeriodoVacacionesRequest $request, int $id): JsonResponse
    {
        $periodo = NomPeriodoVacacional::find($id);
        try {
            if ($periodo) {
                $periodo->update($request->validated());
                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg' => MsgStatus::Updated
                ], 201);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => MsgStatus::NotFound
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $periodo = NomPeriodoVacacional::find($id);

        try {
            if ($periodo) {
                $periodo->delete();
                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg' => MsgStatus::Deleted
                ], 201);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => MsgStatus::NotFound
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
