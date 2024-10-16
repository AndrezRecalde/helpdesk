<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EquipoInvRequest;
use App\Http\Requests\EquipoResponsableInvRequest;
use App\Models\InvCategoria;
use App\Models\InvEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class InvEquipoController extends Controller
{
    function getEquiposInv(Request $request): JsonResponse
    {
        $equipos = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id, inve.modelo,
                                     inve.codigo_antiguo, inve.codigo_nuevo,
                                     inve.numero_serie,
                                     inve.categoria_id, invc.nombre_categoria,
                                     inve.estado_id, inves.nombre_estado, inves.color,
                                     inve.marca_id, invm.nombre_marca')
            ->join('inv_categorias as invc', 'invc.id', 'inve.categoria_id')
            ->join('inv_estados as inves', 'inves.id', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            //->byCodigoAntiguo($request->codigo_antiguo)
            //->byCodigoNuevo($request->codigo_nuevo)
            ->byUsuarioId($request->usuario_id)
            ->byDireccionId($request->direccion_id)
            ->byNumeroSerie($request->numero_serie)
            ->buscarPorCodigo($request->codigo)
            ->byEstadoId($request->estado_id)
            ->byCategoriaId($request->categoria_id)
            ->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'equipos' =>  $equipos
        ], 200);
    }

    function show(int $id): JsonResponse
    {
        $equipo = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id,
                            inve.codigo_antiguo, inve.codigo_nuevo,
                            inve.modelo, inve.numero_serie,
                            inve.fecha_adquisicion, inve.fecha_amortizacion, inve.fecha_baja,
                            inve.vida_util, inve.descripcion,
                            inve.bien_adquirido, inve.bien_donado, inve.bien_usado,
                            inve.ubicacion_id, invu.nombre_ubicacion, invu.nombre_edificio,
                            inve.categoria_id, invc.nombre_categoria,
                            invt.nombre_tipocategoria,
                            inve.estado_id, inves.nombre_estado, inves.color,
                            inve.marca_id, invm.nombre_marca')
            ->with(['usuarios', 'perifericos'])
            ->join('inv_ubicaciones as invu', 'invu.id', 'inve.ubicacion_id')
            ->join('inv_categorias as invc', 'invc.id', 'inve.categoria_id')
            ->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
            ->join('inv_estados as inves', 'inves.id', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            //->byCodigoAntiguo($request->codigo_antiguo)
            //->byCodigoNuevo($request->codigo_nuevo)
            ->where('inve.id', $id)
            ->first();

        return response()->json([
            'status' => MsgStatus::Success,
            'equipo' =>  $equipo
        ], 200);
    }

    function store(EquipoInvRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();  // Iniciar transacción
            $equipo = InvEquipo::create($request->validated());
            $categoria = InvCategoria::find($request->categoria_id);

            // Registrar la relación con un usuario, si los campos correspondientes están presentes
            if ($request->filled('usuario_id') && $request->filled('direccion_id')) {
                $equipo->usuarios()->attach($request->usuario_id, [
                    'direccion_id' => $request->direccion_id,
                    'concepto_id'  => $request->concepto_id,
                    'observacion' =>  $request->observacion
                ]);
            }

            // Reducir el stock de la categoría relacionada
            $categoria->reducirStock(1);

            // Registrar periféricos si se incluyen en la solicitud
            if ($request->filled('perifericos')) {
                foreach ($request->perifericos as $periferico) {
                    $equipo->perifericos()->create($periferico);
                }
            }
            DB::commit();  // Confirmar la transacción si todo sale bien

            return response()->json([
                'status' => 'success',
                'msg'    => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function update(EquipoInvRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);

        try {
            if ($equipo) {
                DB::beginTransaction();  // Iniciar la transacción

                // Actualizar el equipo con los datos validados
                $equipo->update($request->validated());

                // Actualizar la relación de usuario si se incluyen los campos correspondientes
                if ($request->filled('usuario_id') && $request->filled('direccion_id')) {
                    $equipo->usuarios()->syncWithoutDetaching([$request->usuario_id => [
                        'direccion_id' => $request->direccion_id,
                        'concepto_id'  => $request->concepto_id,
                        'observacion'  => $request->observacion,
                    ]]);
                }

                // Manejo de periféricos: actualizar o crear periféricos si están presentes en la solicitud
                if ($request->filled('perifericos')) {
                    foreach ($request->perifericos as $periferico) {
                        // Intentar encontrar un periférico existente según el número de serie
                        $existingPeriferico = $equipo->perifericos()->where('numero_serie', $periferico['numero_serie'])->first();

                        if ($existingPeriferico) {
                            // Actualizar periférico existente
                            $existingPeriferico->update($periferico);
                        } else {
                            // Crear nuevo periférico
                            $equipo->perifericos()->create($periferico);
                        }
                    }
                }

                DB::commit();  // Confirmar la transacción si todo sale bien

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function assignResponsable(EquipoResponsableInvRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        try {
            if ($equipo) {
                if ($request->filled('usuario_id') && $request->filled('direccion_id')) {
                    $equipo->usuarios()->attach($request->usuario_id, [
                        'direccion_id' => $request->direccion_id,
                        'concepto_id'  => $request->concepto_id,
                        'observacion'  =>  $request->observacion
                    ]);
                }

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    public function removeUserFromEquipo($equipo_id, $id)
    {
        // Buscar el equipo
        $equipo = InvEquipo::find($equipo_id);

        // Eliminar la relación entre el usuario y el equipo
        $equipo->usuarios()->wherePivot('id', $id)->detach();

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
