<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\CheckInOut;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class CheckInOutController extends Controller
{
    function getMarcacionesForUser(Request $request): JsonResponse
    {

        // Obtener y verificar los parámetros de entrada
        $badgenumber = $request->input('badgenumber');
        $fechaInicio = $request->input('fecha_inicio');
        $fechaFin = $request->input('fecha_fin');

        // Verificar que los parámetros no sean nulos y sean del tipo correcto
        if (is_null($badgenumber) || is_null($fechaInicio) || is_null($fechaFin)) {
            return response()->json(['error' => 'Parámetros inválidos'], 400);
        }

        // Asegurarse de que las fechas sean cadenas de texto en el formato correcto
        $badgenumber = (string) $badgenumber;
        $fechaInicio = date('Y-m-d H:i:s', strtotime($fechaInicio));
        $fechaFin = date('Y-m-d H:i:s', strtotime($fechaFin));

        // Imprimir los valores para verificación
        Log::info("Llamada al procedimiento almacenado con los parámetros: badgenumber={$badgenumber}, fecha_inicio={$fechaInicio}, fecha_fin={$fechaFin}");

        // Llamar al procedimiento almacenado usando la conexión especificada
        try {
            $results = DB::connection('sqlsrv')->select('EXEC GetCheckinOutData ?, ?, ?', [$badgenumber, $fechaInicio, $fechaFin]);
            $results_permisos = DB::connection('sqlsrv')->select('EXEC GetUserSpeDayData ?, ?, ?', [$badgenumber, $fechaInicio, $fechaFin]);

            return response()->json([
                'status' => MsgStatus::Success,
                'results' => $results,
                'results_permisos' => $results_permisos
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al ejecutar el procedimiento almacenado: ' . $e->getMessage());
            return response()->json(['error' => 'Error al ejecutar el procedimiento almacenado'], 500);
        }
    }
}
