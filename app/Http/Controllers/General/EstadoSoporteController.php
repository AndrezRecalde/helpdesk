<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstadoSoporteController extends Controller
{
    function getEstadosSoportes(): JsonResponse
    {
        $estados = DB::table('sop_estado')->where('activo', 1)->get(['id_estado_caso', 'nombre']);
        return response()->json(['status' => 'success', 'estados' => $estados], 200);
    }
}
