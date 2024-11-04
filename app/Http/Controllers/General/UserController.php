<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserPasswordRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    function getUsuarios(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, nc.nom_cargo,
                        d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion,
                        de.nmbre_dprtmnto as departamento,
                        us.lgin, us.actvo, us.email')
            ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->leftJoin('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->leftJoin('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->direccion($request->cdgo_direccion)
            ->where('us.actvo', 1)
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'usuarios' => $usuarios], 200);
    }

    function getUsuariosExtrict(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, nc.nom_cargo,
                        d.nmbre_dprtmnto as departamento, de.nmbre_dprtmnto as direccion,
                        us.lgin, us.actvo, us.email')
            ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->leftJoin('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->leftJoin('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->where('us.cdgo_direccion', $request->cdgo_direccion)
            ->where('us.actvo', 1)
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'usuarios' => $usuarios], 200);
    }

    function updatePassword(UserPasswordRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::PasswordChange], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => MsgStatus::UserNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }


    function getInfoUsersSoportes(Request $request): JsonResponse
    {
        $info = DB::select('CALL sop_get_info_users_soportes(?)', [$request->user_id]);

        return response()->json(['status' => MsgStatus::Success, 'info' => $info], 200);
    }

    function getInfoSoporteForUser(Request $request): JsonResponse {
        $info = collect(DB::select('CALL per_soporte_user_total(?)', [$request->usuario_id]))->first();

        return response()->json(['status' => MsgStatus::Success, 'info' => $info], 200);
    }
}
