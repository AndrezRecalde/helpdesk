<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\TecnicoRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TecnicoController extends Controller
{
    function getTecnicosAdmin(): JsonResponse
    {
        $tecnicos = User::from('usrios_sstma as u')
            ->selectRaw('u.cdgo_usrio, u.nmbre_usrio,
                            d.nmbre_dprtmnto as departamento,
                            r.id, r.name as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_dprtmnto')
            ->join('model_has_roles as mh', 'mh.model_id', 'u.cdgo_usrio')
            ->join('roles as r', 'r.id', 'mh.role_id')
            ->whereIn('mh.role_id', [1, 2])
            ->get();

        return response()->json(['status' => 'success', 'tecnicos' => $tecnicos], 200);
    }

    function getTecnicos(Request $request): JsonResponse
    {
        $tecnicos = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio,
                            d.nmbre_dprtmnto as departamento,
                            r.id, r.name as role')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->join('model_has_roles as mh', 'mh.model_id', 'us.cdgo_usrio')
            ->join('roles as r', 'r.id', 'mh.role_id')
            ->tecnico($request->cdgo_usrio)
            ->whereIn('mh.role_id', [1, 2])
            ->where('us.actvo', 1)
            ->get();

        return response()->json(['status' => 'success', 'tecnicos' => $tecnicos], 200);
    }

    function updateTecnico(TecnicoRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                $usuario->assignRole($request->roles);
                $usuario->save();
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Técnico no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
