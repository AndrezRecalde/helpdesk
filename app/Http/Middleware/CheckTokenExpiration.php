<?php

namespace App\Http\Middleware;

use App\Enums\MsgStatus;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $token = Auth::user()->currentAccessToken();
            if ($token && $token->expires_at < now()) {
                $token->delete();

                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'El token ha expirado. Inicia sesión nuevamente.'
                ], 401);
            }
        }

        return $next($request);
    }
}
