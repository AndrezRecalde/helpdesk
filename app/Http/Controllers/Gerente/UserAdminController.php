<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPwdRequest;
//use App\Http\Requests\TecnicoRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateActivo;
use App\Models\Soporte;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAdminController extends Controller
{
    function getUsuariosAdmin(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.usu_ci,
                        us.asi_id_reloj, us.titulo, us.nmbre_usrio,
                        us.usu_ape_pat, us.usu_ape_mat, us.usu_nombres,
                        us.nombre_formateado, us.email,
                        us.lgin, us.actvo, us.sexo, ns.idnom_sexo,
                        us.usu_id_empresa,
                        us.cdgo_direccion, d.nmbre_dprtmnto as direccion,
                        us.cdgo_dprtmnto, de.nmbre_dprtmnto as departamento,
                        us.crgo_id, nc.nom_cargo,
                        us.id_tipo_usuario,
                        us.usu_ult_tipo_contrato, ntc.nom_tipo_contrato as tipo_contrato,
                        us.finaliza_contrato, us.usu_f_f_contrato, us.tecnico, us.secretaria_tic,
                        us.super_user, us.interno, us.usu_estado, us.usu_alias, us.usu_ing')
            ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->leftJoin('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->leftJoin('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->leftJoin('nom_sexo as ns', 'ns.idnom_sexo', 'us.sexo')
            ->join('nom_tipo_contrato as ntc', 'ntc.idnom_tipo_contrato', 'us.usu_ult_tipo_contrato')
            ->direccion($request->cdgo_direccion)
            ->nombres($request->nmbre_usrio)
            ->usuario($request->lgin)
            ->get();

        if (sizeof($usuarios) >= 1) {
            return response()->json(['status' => MsgStatus::Success, 'usuarios' => $usuarios], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UsersFilterNotFound], 404);
        }
    }

    function findUser(Request $request): JsonResponse
    {
        $usuario = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, us.nombre_formateado, us.email')
            ->where('us.cdgo_usrio', $request->cdgo_usrio)
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'usuario' => $usuario], 200);
    }

    function store(UserRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            if (is_null($request->cdgo_dprtmnto)) {
                $data['cdgo_dprtmnto'] = $data['cdgo_direccion'];
            }

            User::create($data);

            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => MsgStatus::Created
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => $th->getMessage()
            ], 500);
        }
    }

    function update(UserRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        if (!$usuario) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => MsgStatus::UserNotFound
            ], 404);
        }

        try {
            $data = $request->validated();

            $usuario->fill($data);

            if (is_null($usuario->cdgo_dprtmnto)) {
                $usuario->cdgo_dprtmnto = $usuario->cdgo_direccion;
            }

            if ($request->finaliza_contrato == 0) {
                $usuario->usu_f_f_contrato = null;
            } else {
                $usuario->usu_f_f_contrato = $request->usu_f_f_contrato;
            }

            $usuario->save();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::Updated
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function updateFechaIngreso(Request $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        if (!$usuario) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => MsgStatus::UserNotFound
            ], 404);
        }
        try {
            $usuario->update([
                'usu_fi_institucion' => $request->usu_fi_institucion
            ]);
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated]);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function resetPasword(ResetPwdRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        if (!$usuario) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => MsgStatus::UserNotFound
            ], 404);
        }

        try {
            $usuario->update($request->validated());
            Soporte::create([
                'id_tipo_solicitud' => 7,
                'id_direccion' => $usuario->cdgo_direccion,
                'id_usu_recibe' => $usuario->cdgo_usrio,
                'id_area_tic'   => 5,
                'id_tipo_soporte' => 3,
                'id_usu_tecnico_asig' => auth()->id(),
                'incidente'     =>  'SOLICITUD DE RESETEO DE CONTRASEÑA',
                'solucion'      =>  'SE RESETEO LA CONTRASEÑA AL USUARIO SOLICITANTE'
            ]);
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function updateActivoUser(UserUpdateActivo $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        if (!$usuario) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => MsgStatus::UserNotFound
            ], 404);
        }

        try {
            $usuario->update($request->validated());
            Soporte::create([
                'id_tipo_solicitud' => 7,
                'id_direccion' => $usuario->cdgo_direccion,
                'id_usu_recibe' => $usuario->cdgo_usrio,
                'id_area_tic'   => 5,
                'id_tipo_soporte' => 3,
                'id_usu_tecnico_asig' => auth()->id(),
                'incidente'     => 'SOLICITUD DE ACTIVACIÓN DE USUARIO',
                'solucion'      => 'SE REALIZÓ LA ACTIVACIÓN DEL USUARIO SOLICITANTE'
            ]);
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function verifiedUser(Request $request): JsonResponse
    {
        $usuario = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio')
            ->usuario($request->lgin)
            ->cedula($request->usu_ci)
            ->email($request->email)
            ->first();

        if ($usuario) {
            return response()->json(['status' => MsgStatus::Success, 'usuario' => $usuario], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotFound], 200);
        }
    }

    /* Agregar identificador de Reloj Biometrico */
    public function setCodigoBiometrico(Request $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        if (!$usuario) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => MsgStatus::UserNotFound
            ], 404);
        }

        try {
            $usuario->update(['asi_id_reloj' => $request->asi_id_reloj]);
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    /* Verificar Periodos Vacacionales por usuario */
    public function getConsultarPeriodos(Request $request): JsonResponse
    {
        try {
            $periodos = User::query()
                ->selectRaw('usrios_sstma.cdgo_usrio, usrios_sstma.nmbre_usrio, usrios_sstma.nombre_formateado,
                         usrios_sstma.usu_ci, usrios_sstma.email, usrios_sstma.usu_fi_institucion as fecha_ingreso,
                         usrios_sstma.cdgo_direccion, d.nmbre_dprtmnto as departamento,
                         usrios_sstma.crgo_id, nc.nom_cargo as cargo,
                         usrios_sstma.usu_ult_tipo_contrato, ntc.nom_tipo_contrato as tipo_contrato,
                         ntc.regimen_laboral_id, rgl.nombre_regimen')
                ->with(['periodoVacacionales' => function ($query) {
                    $query->select('nom_periodo_vacacionales.id',
                                   'nom_periodo_vacacionales.cdgo_usrio',
                                   'usrios_sstma.nmbre_usrio',
                                   'nom_periodo_vacacionales.anio',
                                   'nom_periodo_vacacionales.dias_total',
                                   'nom_periodo_vacacionales.dias_tomados',
                                   'nom_periodo_vacacionales.dias_disponibles',
                                   'nom_periodo_vacacionales.activo',
                                   'nom_periodo_vacacionales.observacion',)
                        ->join('usrios_sstma', 'usrios_sstma.cdgo_usrio', '=', 'nom_periodo_vacacionales.cdgo_usrio')
                        ->orderBy('anio', 'DESC');
                }])
                ->leftJoin('dprtmntos as d', 'd.cdgo_dprtmnto', 'usrios_sstma.cdgo_direccion')
                ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'usrios_sstma.crgo_id')
                ->leftJoin('nom_tipo_contrato as ntc', 'ntc.idnom_tipo_contrato', 'usrios_sstma.usu_ult_tipo_contrato')
                ->join('nom_regimen_laboral as rgl', 'rgl.id', 'ntc.regimen_laboral_id')
                ->whereHas('periodoVacacionales')
                ->byCodigoUsuario($request->cdgo_usrio)
                ->orderBy('usrios_sstma.nmbre_usrio', 'asc')
                ->get();

            // Consultar permisos válidos y agrupar por usuario + año
            $permisosAgrupados = DB::table('per_permisos as p')
                ->join('usrios_sstma as u', 'u.cdgo_usrio', '=', 'p.id_usu_pide')
                ->join('nom_periodo_vacacionales as pv', function ($join) {
                    $join->on('pv.cdgo_usrio', '=', 'u.cdgo_usrio');
                    $join->whereRaw('YEAR(p.per_fecha_salida) = pv.anio');
                })
                ->where('p.id_tipo_motivo', 1)
                ->whereNotIn('p.id_estado', [3, 6, 7])
                ->selectRaw('
                u.cdgo_usrio,
                pv.anio,
                pv.observacion,
                SEC_TO_TIME(SUM(TIME_TO_SEC(p.tiempo_estimado))) as tiempo_total,
                ROUND(SUM(TIME_TO_SEC(p.tiempo_estimado)) / 3600 / 24, 2) as dias_equivalentes
            ')
                ->groupBy('u.cdgo_usrio', 'pv.id', 'pv.anio')
                ->get();

            // Agrupar permisos por usuario y año
            $mapaPermisos = [];
            foreach ($permisosAgrupados as $permiso) {
                $mapaPermisos[$permiso->cdgo_usrio][$permiso->anio] = [
                    'tiempo_total' => $permiso->tiempo_total,
                    'dias_equivalentes' => $permiso->dias_equivalentes
                ];
            }

            // Insertar los permisos en los periodos vacacionales de cada usuario
            foreach ($periodos as $periodo) {
                foreach ($periodo->periodoVacacionales as $periodo) {
                    $anio = $periodo->anio;
                    // $nom_periodo_vacacional_id = $periodo->id;
                    if (isset($mapaPermisos[$periodo->cdgo_usrio][$anio])) {
                        $periodo->tiempo_total_permiso = $mapaPermisos[$periodo->cdgo_usrio][$anio]['tiempo_total'];
                        $periodo->dias_equivalentes_permiso = (float)$mapaPermisos[$periodo->cdgo_usrio][$anio]['dias_equivalentes'];
                        $periodo->disponibilidad_vacaciones = (float)$periodo->dias_disponibles - (float)$mapaPermisos[$periodo->cdgo_usrio][$anio]['dias_equivalentes'];
                        //$periodo->nom_periodo_vacacional_id = $nom_periodo_vacacional_id;
                    } else {
                        $periodo->tiempo_total_permiso = "00:00:00";
                        $periodo->dias_equivalentes_permiso = (float)0;
                        $periodo->disponibilidad_vacaciones = (float)0;
                        //$periodo->nom_periodo_vacacional_id = $nom_periodo_vacacional_id;
                    }
                }
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'periodos' => $periodos
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => $th->getMessage()
            ], 500);
        }
    }
}
