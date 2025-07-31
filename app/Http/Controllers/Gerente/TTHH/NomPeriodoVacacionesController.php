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
                ->select('npv.id', 'npv.anio', 'npv.dias_total', 'npv.dias_tomados', 'npv.dias_disponibles', 'npv.observacion')
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
            'status'                 => MsgStatus::Success,
            'total_dias_disponibles' => $totalDiasDisponibles,
            'detalle_por_periodo'    => $periodos
        ]);
    }

    public function store(NomPeriodoVacacionesRequest $request): JsonResponse
    {
        try {
            $cdgo_usrio = $request->cdgo_usrio;
            $regimen_laboral_id = $request->regimen_laboral_id;
            $anios = $request->anios;
            $observacion = $request->observacion;
            $creados = [];

            foreach ($anios as $anio) {
                $existe = NomPeriodoVacacional::where('cdgo_usrio', $cdgo_usrio)
                    ->where('anio', $anio)
                    ->exists();

                if (!$existe) {
                    // Determinar los días según el régimen laboral
                    $dias_total = 0;
                    if (in_array($regimen_laboral_id, [1, 3])) {
                        $dias_total = 30;
                    } elseif ($regimen_laboral_id == 2) {
                        $dias_total = 15;
                    }

                    $periodo = NomPeriodoVacacional::create([
                        'cdgo_usrio'          => $cdgo_usrio,
                        'regimen_laboral_id'  => $regimen_laboral_id,
                        'anio'                => $anio,
                        'dias_total'          => $dias_total,
                        'dias_tomados'        => 0,
                        'dias_disponibles'    => $dias_total,
                        'observacion'         => $observacion,
                        'activo'              => true,
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

    public function updatePeriodo(Request $request, int $id): JsonResponse
    {
        $periodo = NomPeriodoVacacional::find($id);

        try {
            if (!$periodo) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg'    => MsgStatus::NotFound
                ], 404);
            }

            // Validar y obtener los días tomados desde el request
            $dias_tomados = $request->dias_tomados;
            $observacion = $request->observacion;

            // Validación básica (opcional pero recomendable)
            if (!is_numeric($dias_tomados) || $dias_tomados < 0) {
                return response()->json([
                    'status' =>  MsgStatus::Error,
                    'msg'    => 'El valor de días tomados no es válido.'
                ], 422);
            }

            // Recalcular días disponibles
            $dias_disponibles = max($periodo->dias_total - $dias_tomados, 0);
            $activo = $dias_disponibles > 0;

            // Actualizar el modelo
            $periodo->update([
                'dias_tomados'     => $dias_tomados,
                'dias_disponibles' => $dias_disponibles,
                'observacion'      => $observacion,
                'activo'           => $activo,
            ]);

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::Updated
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => $th->getMessage()
            ], 500);
        }
    }


    /* function update(NomPeriodoVacacionesRequest $request, int $id): JsonResponse
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
    } */

    function destroy(int $id): JsonResponse
    {
        $periodo = NomPeriodoVacacional::find($id);

        try {
            if ($periodo) {
                $periodo->delete();
                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg'    => MsgStatus::Deleted
                ], 201);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg'    => MsgStatus::NotFound
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
