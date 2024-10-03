<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EquipoInvRequest;
use App\Http\Requests\EquipoResponsableInvRequest;
use App\Models\InvEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvEquipoController extends Controller
{
    function getEquiposInv(Request $request): JsonResponse
    {
        $equipos = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id, inve.nombre_equipo,
                                inve.codigo_antiguo, inve.codigo_nuevo,
                                inve.modelo, inve.numero_serie,
                                inve.fecha_adquisicion, inve.fecha_amortizacion,
                                inve.vida_util, inve.descripcion,
                                inve.bien_adquirido, inve.bien_donado, inve.bien_usado,
                                inve.ubicacion_id, invu.nombre_ubicacion, invu.nombre_edificio,
                                inve.categoria_id, invc.nombre_categoria,
                                invt.nombre_tipocategoria,
                                inve.estado_id, inves.nombre_estado, inves.color,
                                inve.marca_id, invm.nombre_marca')
            ->with(['usuarios'])
            ->with(['departamentos'])
            ->join('inv_ubicaciones as invu', 'invu.id', 'inve.ubicacion_id')
            ->join('inv_categorias as invc', 'invc.id', 'inve.categoria_id')
            ->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
            ->join('inv_estados as inves', 'inves.id', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            //->byCodigoAntiguo($request->codigo_antiguo)
            //->byCodigoNuevo($request->codigo_nuevo)
            ->buscarPorCodigo($request->codigo)
            ->byEstadoId($request->estado_id)
            ->byCategoriaId($request->categoria_id)
            ->latest();

        return response()->json([
            'status' => MsgStatus::Success,
            'equipos' =>  $equipos
        ], 200);
    }

    function store(EquipoInvRequest $request): JsonResponse
    {
        try {
            $equipo = InvEquipo::create($request->validated());

            if ($request->filled('usuario')) {
                $equipo->usuarios()->attach($request->usuario);
            }

            if ($request->filled('departamento')) {
                $equipo->usuarios()->attach($request->departamento);
            }

            return response()->json([
                'status' => 'success',
                'msg'    => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(EquipoInvRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        try {
            if ($equipo) {
                $equipo->update($request->validated());

                if ($request->filled('usuario')) {
                    $equipo->usuarios()->attach($request->usuario);
                }

                if ($request->filled('departamento')) {
                    $equipo->usuarios()->attach($request->departamento);
                }

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function assignResponsable(EquipoResponsableInvRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        try {
            if ($equipo) {
                if ($request->filled('usuario')) {
                    $equipo->usuarios()->attach($request->usuario);
                }

                if ($request->filled('departamento')) {
                    $equipo->usuarios()->attach($request->departamento);
                }

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    public function removeUserFromEquipo($equipo_id, $user_id)
    {
        // Buscar el equipo
        $equipo = InvEquipo::find($equipo_id);

        // Eliminar la relación entre el usuario y el equipo
        $equipo->usuarios()->detach($user_id);

        // Retornar una respuesta o redireccionar
        return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Deleted], 200);
    }

    function destroy(int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        try {
            if ($equipo) {
                $equipo->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Deleted], 200);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
