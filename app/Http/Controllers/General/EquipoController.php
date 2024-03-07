<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\TipoEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipoController extends Controller
{
    function getEquiposInformaticos(Request $request): JsonResponse
    {
        $equipos = TipoEquipo::from('sop_tipo_equipo as ste')
                ->with([
                    'equipos'
                ])
                ->selectRaw('ste.idsop_tipo_equipo, ste.sop_tipo_equipo_nombre')
                ->get();

        return response()->json(['status' => 'success', 'equipos' => $equipos], 200);
    }
}
