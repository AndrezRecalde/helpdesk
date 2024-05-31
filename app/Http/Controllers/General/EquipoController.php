<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\TipoEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EquipoController extends Controller
{
    function getEquiposInformaticos(): JsonResponse
    {
        $equipos = TipoEquipo::from('sop_tipo_equipo as ste')
                ->with([
                    'equipos'
                ])
                ->selectRaw('ste.idsop_tipo_equipo, ste.sop_tipo_equipo_nombre')
                ->get();

        return response()->json(['status' => MsgStatus::Success, 'equipos' => $equipos], 200);
    }
}
