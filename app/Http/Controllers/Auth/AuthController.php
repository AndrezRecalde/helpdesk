<?php

namespace App\Http\Controllers\Auth;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function login(Request $request): JsonResponse
    {
        try {
            $user = User::from('usrios_sstma as u')
                ->selectRaw('u.cdgo_usrio, u.lgin, u.nmbre_usrio, u.asi_id_reloj, u.usu_alias, u.email, u.crgo_id,
                            d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion, d.cdgo_lrgo, d.id_empresa,
                            CAST((IFNULL(r.id, 3)) AS UNSIGNED) as role_id,
                            CAST((IFNULL(r.name, "USUARIO")) AS NCHAR) as role')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
                ->leftJoin('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
                ->leftJoin('roles as r', 'r.id', 'mh.role_id')
                ->where('u.lgin', $request->lgin)
                ->where('u.paswrd', md5($request->paswrd))
                ->where('u.actvo', 1)
                ->first();
            if ($user) {
                $token = $user->createToken(name: 'auth_token')->plainTextToken;
                return response()->json([
                    'status'        =>  MsgStatus::Success,
                    'token_type'    =>  MsgStatus::TokenBearer,
                    'access_token'  =>  $token,
                    'user'          =>  $user
                ]);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::IncorrectCredentials], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function refresh(): JsonResponse
    {
        $authUserId = Auth::id();
        $user = User::from('usrios_sstma as u')
            ->selectRaw('u.cdgo_usrio, u.lgin, u.nmbre_usrio, u.asi_id_reloj, u.usu_alias, u.email, u.crgo_id,
                        d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion, d.cdgo_lrgo, d.id_empresa,
                        CAST((IFNULL(r.id, 3)) AS UNSIGNED) as role_id,
                        CAST((IFNULL(r.name, "USUARIO")) AS NCHAR) as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->leftJoin('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
            ->leftJoin('roles as r', 'r.id', 'mh.role_id')
            ->where('u.cdgo_usrio', $authUserId)
            ->where('u.actvo', 1)
            ->first();

        if ($user) {
            $user->tokens()->delete();
            $token = $user->createToken(name: 'auth_token')->plainTextToken;
            return response()->json([
                'status'        =>  MsgStatus::Success,
                'token_type'    =>  MsgStatus::TokenBearer,
                'access_token'  =>  $token,
                'user'          =>  $user
            ]);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotActive], 401);
        }
    }

    function profile(): JsonResponse
    {
        $profile = User::from('usrios_sstma as u')
            ->selectRaw('u.cdgo_usrio, u.lgin, u.nmbre_usrio, u.asi_id_reloj, u.usu_alias, u.email,
                    d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion, d.cdgo_lrgo,
                    ne.nom_empresa as empresa, nc.nom_cargo as cargo,
                    CAST((IFNULL(r.id, 3)) AS UNSIGNED) as role_id,
                    CAST((IFNULL(r.name, "USUARIO")) AS NCHAR) as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('nom_empresa as ne', 'ne.idnom_empresa', 'd.id_empresa')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'u.crgo_id')
            ->leftJoin('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
            ->leftJoin('roles as r', 'r.id', 'mh.role_id')
            ->where('u.cdgo_usrio', Auth::user()->cdgo_usrio)
            ->first();

        return response()->json(['status' => MsgStatus::Success, 'profile' => $profile], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg'    => MsgStatus::Logout
        ], 200);
    }
}
