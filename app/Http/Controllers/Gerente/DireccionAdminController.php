<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\DirectorRequest;
use App\Models\Departamento;
use App\Models\Soporte;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DireccionAdminController extends Controller
{
    function getDirectores(Request $request): JsonResponse
    {
        $directores = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo,
                        us.cdgo_usrio as id_jefe, us.nmbre_usrio as jefe,
                        usu.cdgo_usrio as id_encargado, usu.nmbre_usrio as encargado')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->leftJoin('usrios_sstma as usu', 'usu.cdgo_usrio', 'd.id_encargado')
            //->empresa($request->id_empresa)
            ->direccion($request->cdgo_dprtmnto)
            ->where('d.es_direccion', 1)
            ->where('d.interna', 1)
            ->get();
        return response()->json(['status' => MsgStatus::Success, 'directores' => $directores], 200);
    }

    function getDepartamentos(Request $request): JsonResponse
    {
        $departamentos = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo')
            ->where('d.interna', 1)
            ->where('d.cdgo_dprtmnto', $request->cdgo_dprtmnto)
            ->get();
        return response()->json(['status' => MsgStatus::Success, 'departamentos' => $departamentos], 200);
    }

    function updateDirectores(DirectorRequest $request, int $cdgo_dprtmnto): JsonResponse
    {
        $direccion = Departamento::find($cdgo_dprtmnto);

        try {
            if ($direccion) {
                $direccion->update($request->validated());
                $directores = Departamento::from('dprtmntos as d')
                    ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto,
                        us.cdgo_usrio as id_jefe, us.nmbre_usrio as jefe,
                        usu.cdgo_usrio as id_encargado, usu.nmbre_usrio as encargado')
                    ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
                    ->leftJoin('usrios_sstma as usu', 'usu.cdgo_usrio', 'd.id_encargado')
                    //->empresa($request->id_empresa)
                    ->direccion($request->cdgo_dprtmnto)
                    ->where('d.es_direccion', 1)
                    ->where('d.interna', 1)
                    ->where('d.cdgo_dprtmnto', $cdgo_dprtmnto)
                    ->first();
                Soporte::create([
                    'id_tipo_solicitud' => 7,
                    'id_direccion' => $directores->cdgo_dprtmnto,
                    'id_usu_recibe' => $directores->id_encargado,
                    'id_area_tic'   => 5,
                    'id_tipo_soporte' => 3,
                    'id_usu_tecnico_asig' => auth()->id(),
                    'incidente'     =>  'SOLICITUD DE ENCARGO DE DIRECCIÓN',
                    'solucion'      => 'SE REALIZA EL RESPECTIVO CAMBIO DE DIRECTOR ENCARGADO SOLICITADO'

                ]);
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated, 'directores' => $directores], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::DireccionNotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
