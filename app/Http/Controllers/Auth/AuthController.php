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
    /**
     * Método privado reutilizable para obtener usuario con rol
     * Consolida query SQL usado en login, refresh y profile
     */
    private function getUserWithRole($userId = null, $login = null, $password = null)
    {
        $query = User::from('usrios_sstma as u')
            ->selectRaw('u.cdgo_usrio, u.lgin, u.nmbre_usrio, u.asi_id_reloj, u.usu_alias, u.email, u.crgo_id,
                        d.cdgo_dprtmnto, d.nmbre_dprtmnto as direccion, d.cdgo_lrgo, d.id_empresa,
                        CAST((IFNULL(r.id, 3)) AS UNSIGNED) as role_id,
                        CAST((IFNULL(r.name, "USUARIO")) AS NCHAR) as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->leftJoin('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
            ->leftJoin('roles as r', 'r.id', 'mh.role_id')
            ->where('u.actvo', 1);

        if ($userId) {
            $query->where('u.cdgo_usrio', $userId);
        }

        if ($login) {
            $query->where('u.lgin', $login);
        }

        if ($password) {
            $query->where('u.paswrd', md5($password));
        }

        return $query->first();
    }

    function login(Request $request): JsonResponse
    {
        // Validar entrada
        $validated = $request->validate([
            'lgin' => 'required|string|max:255',
            'paswrd' => 'required|string|min:4',
        ]);

        try {
            $user = $this->getUserWithRole(
                login: $validated['lgin'],
                password: $validated['paswrd']
            );

            if ($user) {
                // Generar un nuevo token con un nombre único por dispositivo
                $token = $user->createToken($request->userAgent())->plainTextToken;
                $user->tokens()->latest()->first()->update([
                    'expires_at' => now()->addDays(3)
                ]);
                return response()->json([
                    'status' => MsgStatus::Success,
                    'token_type' => MsgStatus::TokenBearer,
                    'access_token' => $token,
                    'user' => $user
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
        $authUserId = Auth::user()->cdgo_usrio;

        $user = $this->getUserWithRole(userId: $authUserId);

        if (!$user) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::UserNotActive], 404);
        }

        // Obtener el token actual (el que se usó en esta petición)
        $currentToken = $request->user()->currentAccessToken();

        if (!$currentToken) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'Token no encontrado.'], 404);
        }

        // Verificar si el token ha expirado
        if ($currentToken->expires_at < now()) {
            $currentToken->delete();
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'Token expirado. Inicia sesión nuevamente.'], 401);
        }

        // Actualizar la expiración del token ACTUAL (no crear uno nuevo)
        // Esto permite múltiples sesiones simultáneas, cada una renueva su propio token
        $currentToken->update([
            'expires_at' => now()->addDays(3)
        ]);

        return response()->json([
            'status' => MsgStatus::Success,
            'token_type' => MsgStatus::TokenBearer,
            'access_token' => $request->bearerToken(), // Mismo token
            'user' => $user
        ], 200);
    }


    function profile(): JsonResponse
    {
        // Usar query base y agregar joins adicionales para perfil completo
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
            ->where('u.actvo', 1)
            ->first();

        return response()->json(['status' => MsgStatus::Success, 'profile' => $profile], 200);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => MsgStatus::Logout
        ], 200);
    }
}
