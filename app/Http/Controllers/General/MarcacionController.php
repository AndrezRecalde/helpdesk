<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Marcacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarcacionController extends Controller
{
    function getMarcaciones(Request $request): JsonResponse
    {
        $marcaciones = Marcacion::from('asi_marcaciones as am')
                    ->selectRaw('am.idasi_marcaciones, am.ac_no, am.nombre,
                                 am.fecha, am.horario, am.departamento,
                                 am.registro_entrada, am.registro_salida,
                                 am.registro_entrada2, am.registro_salida2,
                                 am.detalle_permiso, am.inicio, am.salida')
                    ->byFechas($request->fecha_inicio, $request->fecha_fin)
                    ->byCedula($request->asi_id_reloj)
                    ->orderBy('am.fecha', 'ASC')
                    ->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'marcaciones' => $marcaciones
        ], 200);
    }
}
