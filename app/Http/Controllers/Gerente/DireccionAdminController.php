<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\DirectorRequest;
use App\Models\Departamento;
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
        return response()->json(['status' => 'success', 'directores' => $directores], 200);
    }

    function getDepartamentos(Request $request): JsonResponse
    {
        $departamentos = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo')
            ->where('d.interna', 1)
            ->where('d.cdgo_dprtmnto', $request->cdgo_dprtmnto)
            ->get();
        return response()->json(['status' => 'success', 'departamentos' => $departamentos], 200);
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
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con exito', 'directores' => $directores], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Dirección no encontrada'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
