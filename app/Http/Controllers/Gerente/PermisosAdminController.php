<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\PermisoAdminRequest;
use App\Models\Permiso;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PermisosAdminController extends Controller
{

    function getPermisosAdmin(Request $request): JsonResponse
    {
        $permisos = Permiso::from('per_permisos as pp')
            ->selectRaw('pp.idper_permisos,
                            pp.id_usu_pide, us.nmbre_usrio as usuario_pide,
                            pp.id_direccion_pide, d.nmbre_dprtmnto as direccion_pide,
                            pp.id_tipo_motivo, ptp.tip_per_nombre as motivo,
                            pp.per_fecha_salida, pp.per_fecha_llegada,
                            pp.id_jefe_inmediato, u.nmbre_usrio as jefe_inmediato,
                            pp.per_observaciones, pp.id_estado, pep.per_est_nombre as estado')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'pp.id_usu_pide')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'pp.id_direccion_pide')
            ->join('per_tipo_permiso as ptp', 'ptp.idper_tipo_permiso', 'pp.id_tipo_motivo')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'pp.id_jefe_inmediato')
            ->join('per_estado_permiso as pep', 'pep.idper_estado_permiso', 'pp.id_estado')
            ->direccion($request->id_direccion_pide)
            ->usuario($request->id_usu_pide)
            ->codigo($request->idper_permisos)
            ->where('pp.per_fecha_salida', 'LIKE', '%' . Carbon::now()->format('Y') . '%')
            ->whereNotIn('pp.id_estado', [6])
            ->orderBy('pp.per_fecha_salida', 'DESC')
            ->get();

        if (sizeof($permisos) > 0) {
            return response()->json(['status' => MsgStatus::Success, 'permisos' => $permisos], 200);
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'No existen permisos con esos filtros'], 404);
        }
    }

    function anularPermisos(Request $request, int $idper_permisos): JsonResponse
    {
        $permiso = Permiso::find($idper_permisos);

        try {
            $permiso->id_estado = 8;
            $permiso->per_observacion_anulado = $request->per_observacion_anulado;
            $permiso->save();
            return response()->json(['status' => MsgStatus::Success, 'msg' => 'El permiso entra en proceso de anulación'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function store(PermisoAdminRequest $request)
    {
        try {
            $permiso = Permiso::create($request->validated());


            /* $pdf = Pdf::loadView('pdf.permisos.gerencia.permiso', $data);
            return $pdf->setPaper('a4', 'portrait')->download('permiso.pdf'); */
            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => 'Permiso #' .$permiso->idper_permisos. ' creado con éxito',
                'idper_permisos' => $permiso->idper_permisos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function exportCardPDFPermiso(Request $request)
    {
        $permisos = Permiso::from('per_permisos as pp')
                ->selectRaw('pp.idper_permisos,
                            pp.id_usu_pide, us.nmbre_usrio as usuario_pide,
                            pp.id_direccion_pide, d.nmbre_dprtmnto as direccion_pide,
                            pp.id_tipo_motivo, ptp.tip_per_nombre as motivo,
                            pp.per_fecha_salida, pp.per_fecha_llegada, pp.fecha_ing,
                            pp.id_jefe_inmediato, u.nmbre_usrio as jefe_inmediato,
                            pp.per_observaciones')
                ->join('usrios_sstma as us', 'us.cdgo_usrio', 'pp.id_usu_pide')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'pp.id_direccion_pide')
                ->join('per_tipo_permiso as ptp', 'ptp.idper_tipo_permiso', 'pp.id_tipo_motivo')
                ->join('usrios_sstma as u', 'u.cdgo_usrio', 'pp.id_jefe_inmediato')
                ->where('pp.idper_permisos', $request->idper_permisos)
                ->first();

            $data = [
                'institucion' => 'GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS',
                'titulo'   =>  'CONCESIÓN DE PERMISO HASTA 4 HORAS',
                'permisos' => $permisos
            ];
        $pdf = Pdf::loadView('pdf.permisos.gerencia.permiso', $data);
        return $pdf->setPaper('a4', 'portrait')->download('permiso.pdf');
    }

    function exportPDFPermiso(Request $request)
    {
        $permisos = Permiso::from('per_permisos as pp')
            ->selectRaw('pp.idper_permisos,
                            pp.id_usu_pide, us.nmbre_usrio as usuario_pide,
                            pp.id_direccion_pide, d.nmbre_dprtmnto as direccion_pide,
                            pp.id_tipo_motivo, ptp.tip_per_nombre as motivo,
                            pp.per_fecha_salida, pp.per_fecha_llegada, pp.fecha_ing,
                            pp.id_jefe_inmediato, u.nmbre_usrio as jefe_inmediato,
                            pp.per_observaciones')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'pp.id_usu_pide')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'pp.id_direccion_pide')
            ->join('per_tipo_permiso as ptp', 'ptp.idper_tipo_permiso', 'pp.id_tipo_motivo')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'pp.id_jefe_inmediato')
            ->where('pp.idper_permisos', $request->idper_permisos)
            ->first();

        $data = [
            'institucion' => 'GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS',
            'titulo'   =>  'CONCESIÓN DE PERMISO HASTA 4 HORAS',
            'permisos' => $permisos
        ];
        $pdf = Pdf::loadView('pdf.permisos.gerencia.permiso', $data);
        return $pdf->setPaper('a4', 'portrait')->download('permiso.pdf');
    }

    function getInfoPermisosForUser(Request $request) : JsonResponse {
        $info_permisos = DB::select('CALL per_permisos_info_user(?)', [$request->usuario_id]);

        return response()->json(['status' => MsgStatus::Success, 'info_permisos' => $info_permisos], 200);
    }
}
