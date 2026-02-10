<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\TecnicoAreaRequest;
use App\Http\Requests\TecnicoRequest;
use App\Models\TecnicoArea;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TecnicoController extends Controller
{
    function getTecnicosAdmin(Request $request): JsonResponse
    {
        try {
            $tecnicos = User::from('usrios_sstma as us')
                ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, us.lgin, us.actvo,
                            us.notificar_telegram, us.telegram_chat_id,
                            r.id as role_id, r.name as role,
                            COUNT(DISTINCT s.id_sop) as total_soportes')
                ->leftJoin('model_has_roles as mh', 'mh.model_id', 'us.cdgo_usrio')
                ->leftJoin('roles as r', 'r.id', 'mh.role_id')
                ->leftJoin(DB::raw('sop_soporte as s'), function ($join) use ($request) {
                    $join->on('s.id_usu_tecnico_asig', '=', 'us.cdgo_usrio')
                        ->whereYear('s.fecha_ini', '=', $request->current_year ?? date('Y'));
                })
                ->whereIn('mh.role_id', [1, 2])
                ->where('us.actvo', 1)
                ->groupBy(
                    'us.cdgo_usrio',
                    'us.nmbre_usrio',
                    'us.lgin',
                    'us.actvo',
                    'us.notificar_telegram',
                    'us.telegram_chat_id',
                    'r.id',
                    'r.name'
                )
                ->get();

            // Cargar áreas para cada técnico
            foreach ($tecnicos as $tecnico) {
                $tecnico->areas = TecnicoArea::where('tecnico_id', $tecnico->cdgo_usrio)
                    ->where('activo', true)
                    ->with('areaTic:id_areas_tic,nombre')
                    ->get()
                    ->map(function ($ta) {
                        return [
                            'id_areas_tic' => $ta->area_tic_id,
                            'nombre' => $ta->areaTic->nombre,
                            'principal' => $ta->principal,
                            'activo' => $ta->activo
                        ];
                    });
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'tecnicos' => $tecnicos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }

    function getTecnicos(Request $request): JsonResponse
    {
        try {
            $tecnicos = User::from('usrios_sstma as us')
                ->selectRaw('us.cdgo_usrio, us.nmbre_usrio,
                                d.nmbre_dprtmnto as departamento,
                                r.id, r.name as role')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
                ->join('model_has_roles as mh', 'mh.model_id', 'us.cdgo_usrio')
                ->join('roles as r', 'r.id', 'mh.role_id')
                ->tecnico($request->cdgo_usrio)
                ->whereIn('mh.role_id', [1, 2])
                ->where('us.actvo', 1)
                ->get();

            // Cargar áreas para cada técnico
            foreach ($tecnicos as $tecnico) {
                $tecnico->areas = TecnicoArea::where('tecnico_id', $tecnico->cdgo_usrio)
                    ->where('activo', true)
                    ->with('areaTic:id_areas_tic,nombre')
                    ->get()
                    ->map(function ($ta) {
                        return [
                            'id_areas_tic' => $ta->area_tic_id,
                            'nombre' => $ta->areaTic->nombre,
                            'principal' => $ta->principal,
                            'activo' => $ta->activo
                        ];
                    });
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'tecnicos' => $tecnicos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }

    function updateTecnico(TecnicoRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        DB::beginTransaction();
        try {
            if (!$usuario) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => MsgStatus::TecnicoNotFound
                ], 404);
            }

            // Actualizar datos del usuario
            $usuario->update($request->validated());

            // Gestionar roles
            if (!$request->filled('roles')) {
                // Si no hay rol, quitar todos los roles y áreas
                $usuario->roles()->detach();
                TecnicoArea::where('tecnico_id', $cdgo_usrio)->delete();
            } else {
                // Asignar nuevo rol
                $usuario->roles()->detach();
                $usuario->assignRole($request->roles);

                // Gestionar áreas TIC (solo para Gerente y Técnico)
                if (in_array($request->roles, [1, 2])) {
                    if ($request->has('areas') && is_array($request->areas) && count($request->areas) > 0) {
                        // Eliminar asignaciones previas
                        TecnicoArea::where('tecnico_id', $cdgo_usrio)->delete();

                        // Crear nuevas asignaciones
                        foreach ($request->areas as $areaId) {
                            TecnicoArea::create([
                                'tecnico_id' => $cdgo_usrio,
                                'area_tic_id' => $areaId,
                                'principal' => $areaId == $request->area_principal,
                                'activo' => true
                            ]);
                        }
                    }
                } else {
                    // Si el rol no es Gerente ni Técnico, eliminar áreas
                    TecnicoArea::where('tecnico_id', $cdgo_usrio)->delete();
                }
            }

            DB::commit();
            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::Updated
            ], 201);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }

    function getInfoTecnicosSoportes(Request $request): JsonResponse
    {
        $info = DB::select('CALL sop_get_info_tecnicos_soportes(?)', [$request->user_id]);

        return response()->json(['status' => MsgStatus::Success, 'info' => $info], 200);
    }


    /* Nuevos Metodos */

    /**
     * Obtener las áreas de un técnico
     */
    public function getAreasTecnico(int $tecnico_id): JsonResponse
    {
        try {
            $tecnico = User::with([
                'areasTicActivas' => function ($query) {
                    $query->select('sop_areas_tic.id_areas_tic', 'nombre')
                        ->withPivot(['principal', 'activo', 'created_at']);
                }
            ])->find($tecnico_id);

            if (!$tecnico) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Técnico no encontrado'
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'areas' => $tecnico->areasTicActivas
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener técnicos de un área específica
     */
    public function getTecnicosArea(int $area_id): JsonResponse
    {
        try {
            $tecnicos = User::from('usrios_sstma as us')
                ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, us.email,
                            sta.principal, sta.activo as area_activa,
                            sta.created_at as asignado_desde')
                ->join('sop_tecnico_areas as sta', 'sta.tecnico_id', 'us.cdgo_usrio')
                ->where('sta.area_tic_id', $area_id)
                ->where('sta.activo', true)
                ->orderBy('sta.principal', 'desc')
                ->get();

            return response()->json([
                'status' => MsgStatus::Success,
                'tecnicos' => $tecnicos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Asignar área a un técnico
     */
    public function asignarArea(TecnicoAreaRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            // Si se marca como principal, desmarcar otras áreas principales del técnico
            if ($data['principal'] ?? false) {
                TecnicoArea::where('tecnico_id', $data['tecnico_id'])
                    ->where('principal', true)
                    ->update(['principal' => false]);
            }

            // Verificar si ya existe la asignación
            $existente = TecnicoArea::where('tecnico_id', $data['tecnico_id'])
                ->where('area_tic_id', $data['area_tic_id'])
                ->first();

            if ($existente) {
                // Actualizar si existe
                $existente->update($data);
                $tecnicoArea = $existente;
            } else {
                // Crear nuevo registro
                $tecnicoArea = TecnicoArea::create($data);
            }

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Área asignada al técnico exitosamente',
                'tecnico_area' => $tecnicoArea
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remover área de un técnico
     */
    public function removerArea(int $id): JsonResponse
    {
        try {
            $tecnicoArea = TecnicoArea::find($id);

            if (!$tecnicoArea) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Asignación no encontrada'
                ], 404);
            }

            // Desactivar en lugar de eliminar
            $tecnicoArea->update(['activo' => false]);

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Área removida del técnico exitosamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar asignación de área (cambiar si es principal o activo)
     */
    public function updateAsignacion(Request $request, int $id): JsonResponse
    {
        try {
            $tecnicoArea = TecnicoArea::find($id);

            if (!$tecnicoArea) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Asignación no encontrada'
                ], 404);
            }

            DB::beginTransaction();

            // Si se marca como principal, desmarcar otras áreas principales
            if ($request->principal) {
                TecnicoArea::where('tecnico_id', $tecnicoArea->tecnico_id)
                    ->where('id', '!=', $id)
                    ->where('principal', true)
                    ->update(['principal' => false]);
            }

            $tecnicoArea->update($request->only(['principal', 'activo']));

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Asignación actualizada exitosamente',
                'tecnico_area' => $tecnicoArea
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener todos los técnicos con sus áreas asignadas
     */
    public function getTecnicosConAreas(): JsonResponse
    {
        try {
            $tecnicos = User::from('usrios_sstma as us')
                ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, us.email, us.actvo,
                            GROUP_CONCAT(DISTINCT sat.nombre SEPARATOR ", ") as areas,
                            MAX(sta.principal) as tiene_area_principal')
                ->join('model_has_roles as mhr', 'mhr.model_id', 'us.cdgo_usrio')
                ->join('roles as r', 'r.id', 'mhr.role_id')
                ->leftJoin('sop_tecnico_areas as sta', 'sta.tecnico_id', 'us.cdgo_usrio')
                ->leftJoin('sop_areas_tic as sat', function ($join) {
                    $join->on('sat.id_areas_tic', '=', 'sta.area_tic_id')
                        ->where('sta.activo', '=', true);
                })
                ->where('r.name', 'TIC_TECNICO')
                ->where('us.actvo', 1)
                ->groupBy('us.cdgo_usrio', 'us.nmbre_usrio', 'us.email', 'us.actvo')
                ->get();

            return response()->json([
                'status' => MsgStatus::Success,
                'tecnicos' => $tecnicos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estad�sticas de Top 6 t�cnicos del �rea SOPORTE T�CNICO (d�a actual)
     */
    function getEstadisticasTecnicos(): JsonResponse
    {
        try {
            $fechaActual = now()->toDateString(); // Fecha actual (YYYY-MM-DD)

            // Obtener t�cnicos del �rea SOPORTE T�CNICO (id_areas_tic = 5)
            $tecnicosArea = TecnicoArea::where('area_tic_id', 5)
                ->where('activo', true)
                ->with(['tecnico:cdgo_usrio,nmbre_usrio'])
                ->get();

            $estadisticas = $tecnicosArea->map(function ($ta) use ($fechaActual) {
                $tecnicoId = $ta->tecnico_id;

                // Contar tickets del d�a actual por estado
                $asignados = \App\Models\Soporte::where('id_usu_tecnico_asig', $tecnicoId)
                    ->where('id_estado', 5) // Asignado
                    ->whereDate('fecha_ini', $fechaActual)
                    ->count();

                $sinCerrar = \App\Models\Soporte::where('id_usu_tecnico_asig', $tecnicoId)
                    ->where('id_estado', 3) // Sin Cerrar
                    ->whereDate('fecha_ini', $fechaActual)
                    ->count();

                $finalizados = \App\Models\Soporte::where('id_usu_tecnico_asig', $tecnicoId)
                    ->where('id_estado', 4) // Finalizado
                    ->whereDate('fecha_ini', $fechaActual)
                    ->count();

                return [
                    'tecnico_id' => $tecnicoId,
                    'nombre' => $ta->tecnico->nmbre_usrio,
                    'asignados' => $asignados,
                    'sin_cerrar' => $sinCerrar,
                    'finalizados' => $finalizados,
                    'total' => $asignados + $sinCerrar + $finalizados
                ];
            })
                ->sortByDesc('total')
                ->take(6)
                ->values();

            return response()->json([
                'status' => MsgStatus::Success,
                'estadisticas' => $estadisticas
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }
}

