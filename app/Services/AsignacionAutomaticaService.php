<?php

namespace App\Services;

use App\Models\AreaTic;
use App\Models\Soporte;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AsignacionAutomaticaService
{
    /**
     * Asignar técnico automáticamente a un soporte según el área
     */
    public function asignarTecnicoAutomatico(Soporte $soporte): ?User
    {
        try {
            // Verificar que el soporte tenga área asignada
            if (!$soporte->id_area_tic) {
                Log::warning("Soporte #{$soporte->numero_sop} no tiene área TIC asignada");
                return null;
            }

            // Obtener el área del soporte
            $area = AreaTic::with('tecnicosActivos')->find($soporte->id_area_tic);

            if (!$area || $area->tecnicosActivos->isEmpty()) {
                Log::warning("Área TIC #{$soporte->id_area_tic} no tiene técnicos activos asignados");
                return null;
            }

            // Seleccionar el técnico óptimo
            $tecnicoSeleccionado = $this->seleccionarTecnicoOptimo($area->tecnicosActivos);

            if ($tecnicoSeleccionado) {
                Log::info("Técnico {$tecnicoSeleccionado->nmbre_usrio} asignado automáticamente al soporte #{$soporte->numero_sop}");
            }

            return $tecnicoSeleccionado;
        } catch (\Throwable $th) {
            Log::error("Error en asignación automática: " . $th->getMessage());
            return null;
        }
    }

    /**
     * Seleccionar el técnico óptimo según la carga de trabajo
     */
    private function seleccionarTecnicoOptimo($tecnicos): ?User
    {
        // 1. Priorizar técnico principal si existe
        $tecnicoPrincipal = $tecnicos->where('pivot.principal', true)->first();

        if ($tecnicoPrincipal) {
            $cargaPrincipal = $this->obtenerCargaTrabajo($tecnicoPrincipal->cdgo_usrio);

            // Si el técnico principal no está sobrecargado (menos de 10 tickets activos), asignarlo
            if ($cargaPrincipal < 10) {
                return $tecnicoPrincipal;
            }
        }

        // 2. Si no hay principal o está sobrecargado, distribuir por carga de trabajo
        $tecnicoConMenorCarga = null;
        $menorCarga = PHP_INT_MAX;

        foreach ($tecnicos as $tecnico) {
            $carga = $this->obtenerCargaTrabajo($tecnico->cdgo_usrio);

            if ($carga < $menorCarga) {
                $menorCarga = $carga;
                $tecnicoConMenorCarga = $tecnico;
            }
        }

        return $tecnicoConMenorCarga;
    }

    /**
     * Obtener la carga de trabajo actual de un técnico
     * (cantidad de tickets activos asignados)
     */
    private function obtenerCargaTrabajo(int $tecnicoId): int
    {
        return Soporte::where('id_usu_tecnico_asig', $tecnicoId)
            ->whereIn('id_estado', [5, 6]) // Estados: Asignado (5), En proceso (6)
            ->count();
    }

    /**
     * Obtener estadísticas de distribución de carga por área
     */
    public function obtenerEstadisticasArea(int $areaId): array
    {
        $area = AreaTic::with('tecnicosActivos')->find($areaId);

        if (!$area) {
            return [];
        }

        $estadisticas = [];

        foreach ($area->tecnicosActivos as $tecnico) {
            $estadisticas[] = [
                'tecnico_id' => $tecnico->cdgo_usrio,
                'nombre' => $tecnico->nmbre_usrio,
                'es_principal' => $tecnico->pivot->principal,
                'tickets_activos' => $this->obtenerCargaTrabajo($tecnico->cdgo_usrio),
                'tickets_totales' => Soporte::where('id_usu_tecnico_asig', $tecnico->cdgo_usrio)
                    ->where('id_area_tic', $areaId)
                    ->count()
            ];
        }

        return $estadisticas;
    }

    /**
     * Verificar si un área tiene capacidad para recibir más tickets
     */
    public function tieneCapacidad(int $areaId, int $umbralMaximo = 50): bool
    {
        $ticketsActivos = Soporte::where('id_area_tic', $areaId)
            ->whereIn('id_estado', [5, 6]) // Asignado o En proceso
            ->count();

        return $ticketsActivos < $umbralMaximo;
    }

    /**
     * Reasignar ticket a otro técnico del área (balanceo de carga)
     */
    public function reasignarPorCarga(Soporte $soporte): ?User
    {
        if (!$soporte->id_area_tic) {
            return null;
        }

        $area = AreaTic::with('tecnicosActivos')->find($soporte->id_area_tic);

        if (!$area || $area->tecnicosActivos->isEmpty()) {
            return null;
        }

        // Excluir el técnico actual de la selección
        $tecnicosDisponibles = $area->tecnicosActivos->filter(function ($tecnico) use ($soporte) {
            return $tecnico->cdgo_usrio !== $soporte->id_usu_tecnico_asig;
        });

        if ($tecnicosDisponibles->isEmpty()) {
            return null;
        }

        return $this->seleccionarTecnicoOptimo($tecnicosDisponibles);
    }
}
