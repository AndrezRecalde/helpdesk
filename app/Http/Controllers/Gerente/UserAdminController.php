<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPwdRequest;
use App\Http\Requests\TecnicoRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateActivo;
use App\Models\Soporte;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserAdminController extends Controller
{
    function getUsuariosAdmin(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.usu_ci, us.titulo,
                        us.nmbre_usrio, us.nombre_formateado,
                        us.email, ns.idnom_sexo, us.sexo, us.lgin, us.actvo,
                        us.usu_id_empresa,
                        d.cdgo_dprtmnto as cdgo_direccion, d.nmbre_dprtmnto as direccion,
                        nc.idnom_cargo as crgo_id, nc.nom_cargo,
                        us.id_tipo_usuario, us.usu_ult_tipo_contrato,
                        us.finaliza_contrato, us.tecnico, us.secretaria_tic,
                        us.super_user, us.interno, us.usu_estado, us.usu_alias, us.usu_ing,
                        de.nmbre_dprtmnto as departamento')
            ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->leftJoin('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->leftJoin('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->leftJoin('nom_sexo as ns', 'ns.idnom_sexo', 'us.sexo')
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
            User::create($request->validated());
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Created], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function update(UserRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function resetPasword(ResetPwdRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);

        try {
            if ($usuario) {
                $usuario->update($request->validated());
                Soporte::create([
                    'id_tipo_solicitud' => 7,
                    'id_direccion' => $usuario->cdgo_direccion,
                    'id_usu_recibe' => $usuario->cdgo_usrio,
                    'id_area_tic'   => 5,
                    'id_tipo_soporte' => 3,
                    'id_usu_tecnico_asig' => auth()->id(),
                    'incidente'     =>  'SOLICITUD DE RESETEO DE CONTRASEÑA',
                    'solucion'      =>  'Se reseteo la contraseña al usuario solicitante'

                ]);
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function updateActivoUser(UserUpdateActivo $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);
        if ($usuario) {
            $usuario->update($request->validated());
            Soporte::create([
                'id_tipo_solicitud' => 7,
                'id_direccion' => $usuario->cdgo_direccion,
                'id_usu_recibe' => $usuario->cdgo_usrio,
                'id_area_tic'   => 5,
                'id_tipo_soporte' => 3,
                'id_usu_tecnico_asig' => auth()->id(),
                'incidente'     =>  'SOLICITUD DE ACTIVACIÓN DE USUARIO',
                'solucion'      => 'SE REALIZÓ LA ACTIVACIÓN DEL USUARIO SOLICITANTE'

            ]);
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotFound], 404);
        }
    }

    function verifiedUser(Request $request): JsonResponse
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
}
