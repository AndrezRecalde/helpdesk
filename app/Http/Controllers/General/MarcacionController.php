<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Checkinout;
use App\Models\Marcacion;
use Carbon\Carbon;
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
            'asi_id_reloj' => 'required'
        ]);

        // Ejecutar el procedimiento almacenado utilizando el parámetro como string
        $sql = "EXEC SP_GetUserEventsByBadge ?, ?, ?";
        $marcaciones = DB::connection('sqlsrv')->select($sql, [
            (string) $request->asi_id_reloj,
            $request->fecha_inicio,
            $request->fecha_fin  // Asegúrate de enviar un string
        ]);

        return response()->json([
            'status' => MsgStatus::Success,
            'marcaciones' => $marcaciones
        ], 200);
    }

    function addMarcacion(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $_user = DB::connection('sqlsrv')->table('USERINFO')
                ->where('BADGENUMBER', $request->asi_id_reloj)
                ->first();
            /* $_marcacion = Checkinout::where('USERID', $_user->USERID)
                ->where('CHECKTIME', Carbon::now()->format('Y-m-d'))
                ->first(); */

            $marcacion = new Checkinout();
            $marcacion->USERID = $_user->USERID;
            $marcacion->CHECKTIME = Carbon::now()->format('Y-m-d H:i:s');
            $marcacion->CHECKTYPE = 'I';
            $marcacion->VERIFYCODE = 1;
            $marcacion->SENSORID = 2;
            $marcacion->Memoinfo = NULL;
            $marcacion->WorkCode = 0;
            $marcacion->sn = NULL;
            $marcacion->UserExtFmt = 1;
            $marcacion->VERIFYAPPROVE = NULL;
            $marcacion->GEOLT = NULL;
            $marcacion->GEOLG = NULL;
            $marcacion->MARCTYPE = 'IR';
            $marcacion->EDITADA = 0;

            $marcacion->save();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'msg' => 'Se ha registrado su marcación correctamente'
            ], 201);

        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
