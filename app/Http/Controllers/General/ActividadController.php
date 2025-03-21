<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActividadRequest;
use App\Models\Actividad;
use App\Models\Soporte;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class ActividadController extends Controller
{
    function getActivForUserForDates(Request $request): JsonResponse
    {
        $actividades = Actividad::from('srv_actividades as a')
            ->selectRaw('a.id, a.actividad,
                         date_format(a.fecha_actividad, "%Y-%m-%d") as fecha,
                         a.fecha_actividad,
                         u.nmbre_usrio as usuario,
                         u.cdgo_usrio as cdgo_usrio,
                         d.nmbre_dprtmnto as departamento,
                         us.nmbre_usrio as director')
            //->with(['imagenes'])
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'a.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->where('a.user_id', $request->user_id)
            ->whereBetween('a.fecha_actividad', [$request->fecha_inicio, $request->fecha_fin])
            ->orderBy('a.fecha_actividad', 'DESC')
            ->get();

        if (sizeof($actividades) >= 1) {
            return response()->json(['status' => MsgStatus::Success, 'actividades' => $actividades], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::ActivitiesNotFound], 500);
        }
    }

    function store(ActividadRequest $request): JsonResponse
    {
        try {
            // Crear la actividad
            $actividad = Actividad::create($request->validated());
            $user = Auth::user();
            $role = $user->roles->first();

            // Agregar la entrada en la tabla 'soporte' si el rol del usuario es 1 o 2
            if ($role && ($role->id == 1 || $role->id == 2)) {
                Soporte::create([
                    'id_tipo_solicitud' => 7,
                    'fecha_ini' => $actividad->fecha_actividad,
                    'fecha_fin' => $actividad->fecha_actividad,
                    'fecha_asig' => $actividad->fecha_actividad,
                    'id_direccion' => 22,
                    'id_usu_recibe' => 701,
                    'id_tipo_soporte' => '3',
                    'incidente'   => 'SOLICITUD INTERNA DEL ÁREA DE TIC',
                    'solucion'    => Str::upper($actividad->actividad),
                    'id_area_tic' => 5,
                    'id_usu_tecnico_asig' => $user->cdgo_usrio
                ]);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::ActivityRegistred,
                'role'   => $role
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => $th->getMessage()
            ], 500);
        }
    }


    function update(ActividadRequest $request, int $id): JsonResponse
    {
        try {
            $actividad = Actividad::find($id);
            if (!$actividad) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg'    => MsgStatus::ActivitiesNotFound
                ], 404);
            }

            // Actualizar la actividad
            $actividad->update($request->validated());

            // Obtener usuario autenticado y su rol
            $user = Auth::user();
            $role = $user->roles->first();

            // Verificar si el rol es 1 o 2
            if ($role && ($role->id == 1 || $role->id == 2)) {
                // Buscar si existe un registro en soporte relacionado a la actividad
                $soporte = Soporte::where('id_tipo_solicitud', 7)
                    ->where('fecha_ini', $actividad->fecha_actividad)
                    ->where('id_usu_tecnico_asig', $user->cdgo_usrio)
                    ->first();

                if ($soporte) {
                    // Actualizar el soporte existente
                    $soporte->update([
                        'fecha_fin'  => $actividad->fecha_actividad,
                        'fecha_asig' => $actividad->fecha_actividad,
                        'solucion'   => Str::upper($actividad->actividad),
                    ]);
                } else {
                    // Crear un nuevo registro en soporte si no existe
                    Soporte::create([
                        'id_tipo_solicitud' => 7,
                        'fecha_ini' => $actividad->fecha_actividad,
                        'fecha_fin' => $actividad->fecha_actividad,
                        'fecha_asig' => $actividad->fecha_actividad,
                        'id_direccion' => 22,
                        'id_usu_recibe' => 701,
                        'id_tipo_soporte' => '3',
                        'incidente'   => 'SOLICITUD INTERNA DEL ÁREA DE TIC',
                        'solucion'    => Str::upper($actividad->actividad),
                        'id_area_tic' => 5,
                        'id_usu_tecnico_asig' => $user->cdgo_usrio
                    ]);
                }
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::ActivityUpdated
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => $th->getMessage()
            ], 500);
        }
    }




    function exportPDFActividadesForUser(Request $request)
    {
        $actividades = Actividad::from('srv_actividades as a')
            ->selectRaw('a.id, a.actividad,
                         date_format(a.fecha_actividad, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         u.crgo_id,
                         u.crgo as cargo_usuario,
                         d.nmbre_dprtmnto as departamento,
                         d.id_empresa,
                         us.nmbre_usrio as director, us.crgo as cargo_director')
            //->with(['imagenes'])
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'a.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->where('a.user_id', $request->user_id)
            ->whereBetween('a.fecha_actividad', [$request->fecha_inicio, $request->fecha_fin])
            ->orderBy('current_fecha', 'ASC')
            ->get();

        if (sizeof($actividades) >= 1) {
            $data = [
                'title' => 'Informe de reporte de actividades',
                'actividades' => $actividades,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
                'current_fecha' => Carbon::now()->format('Y-m-d')
            ];

            $pdf = Pdf::loadView('pdf.actividades.reporte', $data);
            return $pdf->setPaper('a4', 'portrait')->download('actividades.pdf');
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::ActivitiesNotFound], 404);
        }
    }
}
