<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Http\Requests\TecnicoRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserAdminController extends Controller
{
    function getUsuariosAdmin(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, nc.nom_cargo,
                        d.nmbre_dprtmnto as departamento, de.nmbre_dprtmnto as direccion,
                        us.lgin, us.actvo, us.email')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('dprtmntos as de', 'd.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->direccion($request->cdgo_direccion)
            ->get();

        return response()->json(['status' => 'success', 'usuarios' => $usuarios]);
    }

    function store(UserRequest $request): JsonResponse
    {
        try {
            User::create($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(UserRequest $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Usuario no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function updateTecnico(TecnicoRequest $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
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

    function getTecnicos(): JsonResponse
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
}
