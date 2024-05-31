<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class TipoContratoController extends Controller
{
    function getTiposContratos(): JsonResponse
    {
        $tiposContratos = DB::table("nom_tipo_contrato")->get(['idnom_tipo_contrato', 'nom_tipo_contrato']);
        return response()->json(['status' => MsgStatus::Success, 'tiposContratos' => $tiposContratos]);
    }
}
