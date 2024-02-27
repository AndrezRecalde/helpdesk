<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\DirectorRequest;
use App\Models\Departamento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DireccionAdminController extends Controller
{
    function getDirecciones(): JsonResponse
    {
        $direcciones = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo,
                        us.cdgo_usrio, us.nmbre_usrio as usuario')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            //->where('d.id_empresa', $request->id_empresa)
            ->where('d.es_direccion', 1)
            ->where('d.interna', 1)
            ->get();
        return response()->json(['status' => 'success', 'direcciones' => $direcciones], 200);
    }

    function getDepartamentos(Request $request): JsonResponse
    {
        $departamentos = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo')
            ->where('d.interna', 1)
            ->where('d.id_direccion', $request->id_direccion)
            ->get();
        return response()->json(['status' => 'success', 'departamentos' => $departamentos], 200);
    }

    function updateDirectores(DirectorRequest $request, int $id): JsonResponse
    {
        $direccion = Departamento::find($id);

        try {
            if ($direccion) {
                $direccion->updated($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con exito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Dirección no encontrada'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
