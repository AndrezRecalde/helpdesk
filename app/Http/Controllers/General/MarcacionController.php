<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Marcacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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



    /* MARCACIONES DE BIOMETRICOS: SE CONECTA A SQL SERVER */
    function getMarcacionesBiometrico(Request $request): JsonResponse
    {

        // Validar que el parámetro UserId esté presente y sea un número entero.
        $request->validate([
            'UserCi' => 'required'
        ]);

        $marcaciones = DB::connection('sqlsrv')->select('EXEC GetUserCheckinsForCurrentMonth ?', ['802704171']);

        return response()->json([
            'status' => MsgStatus::Success,
            'marcaciones' => $marcaciones
        ], 200);
    }
}
