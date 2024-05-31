<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoSolicitudController extends Controller
{
    function getTiposSolicitudesSoporte(): JsonResponse
    {
        $tipos_solicitudes = DB::table('sop_tipo_solicitud')
            ->where('activo', 1)
            ->get(['id_tipo_solic', 'nombre']);

        return response()->json(['status' => MsgStatus::Success, 'tipos_solicitudes' => $tipos_solicitudes], 200);
    }
}
