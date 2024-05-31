<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiagnosticoController extends Controller
{
    function getDiagnosticos(): JsonResponse
    {
        $diagnosticos = DB::table('sop_diagnostico as sd')
            ->where('activo', 1)
            ->get(['id_diagnostico', 'diagnostico']);

        return response()->json(['status' => MsgStatus::Success, 'diagnosticos' => $diagnosticos], 200);
    }
}
