<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Models\Marcacion;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

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
        $sql = "EXEC sp_GetMarcacionesPorDiaYTipo_v3 ?, ?, ?";
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

            if ($_user) {
                DB::connection('sqlsrv')->table('CHECKINOUT')->insert([
                    'USERID' => $_user->USERID,
                    'CHECKTIME' => DB::raw("CONVERT(DATETIME, '" . Carbon::now()->format('Y-m-d H:i:s') . "', 120)"),
                    'CHECKTYPE' => $request->checktype,
                    'VERIFYCODE' => 1,
                    'SENSORID' => 2,
                    'Memoinfo' => NULL,
                    'WorkCode' => 0,
                    'sn' => NULL,
                    'UserExtFmt' => 1,
                    'VERIFYAPPROVE' => NULL,
                    'GEOLT' => NULL,
                    'GEOLG' => NULL,
                    'MARCTYPE' => 'IR',
                    'EDITADA' => 0,
                ]);
                return response()->json([
                    'status' => 'success',
                    'msg' => 'Se ha registrado su marcación correctamente'
                ], 201);
            } else {
                return response()->json([
                    'status' => 'error',
                    'msg' => 'El usuario no existe en el Reloj Biometrico'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function exportJustificativo(Request $request)
    {
        $info_usuario = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, us.usu_ci,
                        us.cdgo_direccion, d.nmbre_dprtmnto as nombre_direccion, d.acronimo')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->where('us.cdgo_usrio', $request->cdgo_usrio)
            ->first();

        $jefe_departamento = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, us.nmbre_usrio as jefe, nc.nom_cargo as cargo_jefe')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->where('d.cdgo_dprtmnto', $info_usuario->cdgo_direccion)
            ->first();

        $jefe_tthh = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, us.nmbre_usrio as jefe, nc.nom_cargo as cargo_jefe')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->where('d.cdgo_dprtmnto', 4)
            ->first();

        $data = [
            'numero_memorando' => $request->numero_memorando,
            'asunto' => 'INFORME DE JUSTIFICACIÓN DE MARCACIÓN',
            'info_usuario' => $info_usuario,
            'info_jefe_tthh' => $jefe_tthh,
            'info_jefe_departamento' => $jefe_departamento,
            'fechas' => $request->fechas,
            'fecha_actual' => Carbon::now()->format('Y-m-d'),
        ];
        $pdf = Pdf::loadView('pdf.marcacion.justificativo', $data);
        return $pdf->setPaper('a4', 'portrait')->download('justificativo.pdf');
    }
}
