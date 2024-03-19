<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserPasswordRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function getUsuarios(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, nc.nom_cargo,
                        d.nmbre_dprtmnto as departamento, de.nmbre_dprtmnto as direccion,
                        us.lgin, us.actvo, us.email')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->direccion($request->cdgo_direccion)
            ->where('us.actvo', 1)
            ->get();

        return response()->json(['status' => 'success', 'usuarios' => $usuarios], 200);
    }

    function getUsuariosExtrict(Request $request): JsonResponse
    {
        $usuarios = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio, nc.nom_cargo,
                        d.nmbre_dprtmnto as departamento, de.nmbre_dprtmnto as direccion,
                        us.lgin, us.actvo, us.email')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('dprtmntos as de', 'de.cdgo_dprtmnto', 'us.cdgo_dprtmnto')
            ->where('us.cdgo_direccion', $request->cdgo_direccion)
            ->where('us.actvo', 1)
            ->get();

        return response()->json(['status' => 'success', 'usuarios' => $usuarios], 200);
    }

    function updatePassword(UserPasswordRequest $request, int $cdgo_usrio): JsonResponse
    {
        $usuario = User::find($cdgo_usrio);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Contraseña actualizada con éxito'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Usuario no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
