<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EstadoSoporteController extends Controller
{
    function getEstadosSoportes(): JsonResponse
    {
        $estados = DB::table('sop_estado')
                    ->where('activo', 1)
                    ->get(['id_estado_caso', 'nombre']);

        return response()->json(['status' => MsgStatus::Success, 'estados' => $estados], 200);
    }
}
