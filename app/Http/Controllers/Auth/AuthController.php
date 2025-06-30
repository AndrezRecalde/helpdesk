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
                // Generar un nuevo token con un nombre único por dispositivo
                // $token = $user->createToken($request->userAgent())->plainTextToken;
                $token = $user->createToken($request->userAgent())->plainTextToken;
                $user->tokens()->latest()->first()->update([
                    'expires_at' => now()->addDays(3)
                ]);
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

    function refresh(Request $request): JsonResponse
    {
        $authUserId = Auth::user()->cdgo_usrio; // Laravel debe reconocer 'cdgo_usrio' como clave

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

        if (!$user) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotActive], 404);
        }

        // 🔥 Obtener manualmente el token del usuario en la tabla 'personal_access_tokens'
        $currentToken = $user->tokens()->where('tokenable_id', $user->cdgo_usrio)->latest()->first();

        if (!$currentToken) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'No se encontró un token para este usuario.'], 404);
        }

        // Si el token ha expirado, eliminarlo
        if ($currentToken->expires_at < now()) {
            $currentToken->delete();
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'El token ha expirado. Inicia sesión nuevamente.'], 401);
        }

        // Generar un nuevo token
        $newToken = $user->createToken($request->userAgent())->plainTextToken;

        // Actualizar la fecha de expiración del nuevo token
        $user->tokens()->latest()->first()->update([
            'expires_at' => now()->addDays(3)
        ]);

        return response()->json([
            'status' => MsgStatus::Success,
            'token_type' => MsgStatus::TokenBearer,
            'access_token' => $newToken,
            'user' => $user
        ], 201);
    }


    function profile(): JsonResponse
    {
        $profile = User::from('usrios_sstma as u')
            ->selectRaw('u.cdgo_usrio, u.lgin, u.nmbre_usrio, u.asi_id_reloj, u.usu_alias, u.email,
                    d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion, d.cdgo_lrgo,
                    ne.nom_empresa as empresa, nc.nom_cargo as cargo,
                    u.usu_ult_tipo_contrato, ntc.nom_tipo_contrato as tipo_contrato,
                    ntc.regimen_laboral_id, rgl.nombre_regimen,
                    CAST((IFNULL(r.id, 3)) AS UNSIGNED) as role_id,
                    CAST((IFNULL(r.name, "USUARIO")) AS NCHAR) as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('nom_empresa as ne', 'ne.idnom_empresa', 'd.id_empresa')
            ->leftJoin('nom_cargo as nc', 'nc.idnom_cargo', 'u.crgo_id')
            ->leftJoin('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
            ->leftJoin('roles as r', 'r.id', 'mh.role_id')
            ->leftJoin('nom_tipo_contrato as ntc', 'ntc.idnom_tipo_contrato', 'u.usu_ult_tipo_contrato')
            ->join('nom_regimen_laboral as rgl', 'rgl.id', 'ntc.regimen_laboral_id')
            ->where('u.cdgo_usrio', Auth::user()->cdgo_usrio)
            ->first();

        return response()->json(['status' => MsgStatus::Success, 'profile' => $profile], 200);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg'    => MsgStatus::Logout
        ], 200);
    }
}
