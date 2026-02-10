<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Services\AsignacionAutomaticaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AsignacionController extends Controller
{
    protected $asignacionService;

    public function __construct(AsignacionAutomaticaService $asignacionService)
    {
        $this->asignacionService = $asignacionService;
    }

    /**
     * Obtener estadísticas de distribución de carga por área
     */
    public function getEstadisticasArea(int $area_id): JsonResponse
    {
        try {
            $estadisticas = $this->asignacionService->obtenerEstadisticasArea($area_id);

            if (empty($estadisticas)) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Área no encontrada o sin técnicos asignados'
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'estadisticas' => $estadisticas
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Verificar capacidad de un área
     */
    public function verificarCapacidad(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'area_id' => 'required|integer|exists:sop_areas_tic,id_areas_tic',
                'umbral_maximo' => 'nullable|integer|min:1|max:100'
            ]);

            $umbral = $request->umbral_maximo ?? 50;
            $tieneCapacidad = $this->asignacionService->tieneCapacidad(
                $request->area_id,
                $umbral
            );

            return response()->json([
                'status' => MsgStatus::Success,
                'tiene_capacidad' => $tieneCapacidad,
                'umbral_configurado' => $umbral
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener resumen de todas las áreas con sus estadísticas
     */
    public function getResumenAreas(): JsonResponse
    {
        try {
            $areas = \App\Models\AreaTic::with('tecnicosActivos')
                ->where('activo', true)
                ->get();

            $resumen = [];

            foreach ($areas as $area) {
                $estadisticas = $this->asignacionService->obtenerEstadisticasArea($area->id_areas_tic);

                $ticketsActivos = \App\Models\Soporte::where('id_area_tic', $area->id_areas_tic)
                    ->whereIn('id_estado', [5, 6])
                    ->count();

                $resumen[] = [
                    'area_id' => $area->id_areas_tic,
                    'nombre' => $area->nombre,
                    'tecnicos_asignados' => count($estadisticas),
                    'tickets_activos' => $ticketsActivos,
                    'tiene_capacidad' => $this->asignacionService->tieneCapacidad($area->id_areas_tic),
                    'tecnicos' => $estadisticas
                ];
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'areas' => $resumen
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
