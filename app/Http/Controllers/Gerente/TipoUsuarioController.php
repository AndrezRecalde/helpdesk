<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoUsuarioController extends Controller
{
    function getTipoUsuarios(): JsonResponse
    {
        $tipos_usuarios = DB::table("sys_tipo_usuario")->get();
        return response()->json(['status' => 'success', 'tipos_usuarios' => $tipos_usuarios]);
    }
}
