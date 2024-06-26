<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SexoController extends Controller
{
    function getTipoSexo(): JsonResponse
    {
        $tipo_sexo = DB::table("nom_sexo")->get();
        return response()->json(['status' => MsgStatus::Success, 'tipo_sexo' => $tipo_sexo], 200);
    }
}
