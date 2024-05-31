<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Models\Soporte;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashGerenteController extends Controller
{
    function getDashboardGerencia(): JsonResponse
    {
        /* Se hace todo anual */
        $soportesForEstado = DB::select('CALL sop_get_soportes_for_estado');
        $soportesPorMes = DB::select('CALL sop_get_soportes_mes');
        $soportesForAreas =   DB::select('CALL sop_get_soportes_areas');

        $soportesActuales = Soporte::where('fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")->get()->count();
        $soportesNoAsignados = Soporte::where('fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")->where('id_estado', 6)->get()->count();
        $soportesPendientes = Soporte::where('fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")->where('id_estado', 1)->get()->count();
        $soportesCerrados = Soporte::where('fecha_ini', "LIKE", "%" . Carbon::now()->format('Y-m-d') . "%")->where('id_estado', 4)->get()->count();

        $totalUsuarios = User::where('actvo', 1)->count();
        $totalDirecciones = Departamento::where('interna', 1)->where('es_direccion', 1)->count();
        $totalTecnicos = User::from('usrios_sstma as us')
                        ->join('model_has_roles as mhr', 'mhr.model_id', 'us.cdgo_usrio')
                        ->join('roles as r', 'r.id', 'mhr.role_id')
                        ->whereIn('r.id', [1,2])
                        ->count();

        $totalAreasTic = DB::table('sop_areas_tic')->where('activo', 1)->count();

        return response()->json([
            'status'              => MsgStatus::Success,
            'soportesForEstado'   => $soportesForEstado,
            'soportesPorMes'      => $soportesPorMes,
            'soportesForAreas'    => $soportesForAreas,
            'soportesActuales'    => $soportesActuales,
            'soportesNoAsignados' => $soportesNoAsignados,
            'soportesPendientes'  => $soportesPendientes,
            'soportesCerrados'    => $soportesCerrados,
            'totalUsuarios'       => $totalUsuarios,
            'totalDirecciones'    => $totalDirecciones,
            'totalTecnicos'       => $totalTecnicos,
            'totalAreasTic'       => $totalAreasTic
        ], 200);
    }

    function getDesempenoForTecnicosAnual(): JsonResponse
    {
        $desempenoForTecnicos = DB::select('CALL sop_get_desempeno_for_tecnicos_anual');

        return response()->json(['status' => MsgStatus::Success, 'desempenoForTecnicos' => $desempenoForTecnicos], 200);
    }
}
