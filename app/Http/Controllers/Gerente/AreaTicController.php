<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\AreaTicRequest;
use App\Models\AreaTic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AreaTicController extends Controller
{
    /**
     * Obtener todas las áreas de TIC
     */
    public function getAreasTic(): JsonResponse
    {
        try {
            $areas = AreaTic::activo(true)
                ->get(['id_areas_tic', 'nombre', 'activo']);

            return response()->json([
                'status' => MsgStatus::Success,
                'areas' => $areas,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener todas las áreas (activas e inactivas)
     */
    public function getAllAreasTic(): JsonResponse
    {
        try {
            $areas = AreaTic::get(['id_areas_tic', 'nombre', 'activo']);

            return response()->json([
                'status' => MsgStatus::Success,
                'areas' => $areas,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un área específica con sus técnicos
     */
    public function show(int $id): JsonResponse
    {
        try {
            $area = AreaTic::with([
                'tecnicosActivos' => function ($query) {
                    $query->select('cdgo_usrio', 'nmbre_usrio', 'email');
                }
            ])->find($id);

            if (!$area) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Área no encontrada'
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'area' => $area
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Crear nueva área de TIC
     */
    public function store(AreaTicRequest $request): JsonResponse
    {
        try {
            $area = AreaTic::create($request->validated());

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Área creada exitosamente',
                'area' => $area
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar área de TIC
     */
    public function update(AreaTicRequest $request, int $id): JsonResponse
    {
        try {
            $area = AreaTic::find($id);

            if (!$area) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Área no encontrada'
                ], 404);
            }

            $area->update($request->validated());

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Área actualizada exitosamente',
                'area' => $area
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar (desactivar/activar) área de TIC
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $area = AreaTic::find($id);

            if (!$area) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Área no encontrada'
                ], 404);
            }

            // Alternar estado activo/inactivo
            $nuevoEstado = !$area->activo;
            $area->update(['activo' => $nuevoEstado]);

            $mensaje = $nuevoEstado
                ? 'Área activada exitosamente'
                : 'Área desactivada exitosamente';

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => $mensaje
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
