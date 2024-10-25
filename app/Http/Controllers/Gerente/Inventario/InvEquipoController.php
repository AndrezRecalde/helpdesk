<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\AssignComponenteRequest;
use App\Http\Requests\EquipoDocumentoRequest;
use App\Http\Requests\EquipoInvRequest;
use App\Http\Requests\EquipoResponsableInvRequest;
use App\Models\InvCategoria;
use App\Models\InvDocumentoEquipo;
use App\Models\InvEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class InvEquipoController extends Controller
{
    function getEquiposInv(Request $request): JsonResponse
    {
        $equipos = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id, inve.modelo, inve.numero_serie,
                                     inve.codigo_antiguo, inve.codigo_nuevo,
                                     inve.categoria_id, invc.nombre_categoria,
                                     inve.estado_id, inves.nombre_estado, inves.color,
                                     inve.marca_id, invm.nombre_marca')
            /* invt.id as tipocategoria_id,
                                     inve.ubicacion_id, invu.nombre_edificio' */
            ->join('inv_categorias as invc', 'invc.id', 'inve.categoria_id')
            ->join('inv_estados as inves', 'inves.id', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            //->join('inv_ubicaciones as invu', 'invu.id', 'inve.ubicacion_id')
            //->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
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
                            invt.id as tipocategoria_id, invt.nombre_tipocategoria,
                            inve.estado_id, inves.nombre_estado, inves.color,
                            inve.marca_id, invm.nombre_marca')
            ->with([
                'usuarios',
                'perifericos.categoria',
                'documentos'
            ])
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

            DB::commit();  // Confirmar la transacción si todo sale bien

            return response()->json([
                'status' => 'success',
                'msg'    => MsgStatus::Created,
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function update(EquipoInvRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        $categoria = InvCategoria::find($request->categoria_id);

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

                if ($categoria != $equipo->categoria_id) {
                    $categoria->reducirStock(1);
                }

                DB::commit();  // Confirmar la transacción si todo sale bien

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function assignComponente(AssignComponenteRequest $request, int $id): JsonResponse
    {
        try {
            // Encuentra el equipo
            $equipo = InvEquipo::find($id);

            // Verifica si la solicitud tiene periféricos
            if ($request->filled('perifericos')) {
                // Limpia los periféricos actuales para evitar duplicados
                //$equipo->perifericos()->delete();

                // Itera sobre cada periférico del request y los asocia al equipo
                foreach ($request->perifericos as $perifericoData) {
                    $equipo->perifericos()->create($perifericoData);
                }

                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg'    => MsgStatus::ComponentesSuccess,
                ], 200);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg'    => MsgStatus::NotFound,
                ], 400);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
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
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    function guardarDocumento(EquipoDocumentoRequest $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        try {
            if ($request->hasFile('documento')) {
                // Almacenar el archivo en la carpeta "archivos" dentro del directorio de storage/app/public/
                $archivoPath = $request->file('documento')->store('archivos', 'public');

                // Guardar la referencia del documento en la base de datos
                $documentoEquipo = new InvDocumentoEquipo();
                $documentoEquipo->equipo_id = $equipo->id;
                $documentoEquipo->documento = $archivoPath;
                $documentoEquipo->nombre_documento = $request->nombre_documento;
                $documentoEquipo->save();

                return response()->json([
                    'status'    => 'success',
                    'msg'       => 'Documento cargado exitosamente.',
                    //'ruta'      => $archivoPath,
                ], 201);
            }

            return response()->json(['status' => 'error', 'msg' => 'No se pudo cargar el documento.'], 400);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'message' => $th->getMessage()], 500);
        }
    }

    public function eliminarDocumento(int $id): JsonResponse
    {
        // Buscar el documento por su ID
        $documento = InvDocumentoEquipo::find($id);

        if (!$documento) {
            return response()->json([
                'status' => 'error',
                'msg' => 'Documento no encontrado.'
            ], 404);
        }

        // Eliminar el archivo del almacenamiento
        if (Storage::exists('archivos/' . $documento->documento)) {
            Storage::delete('archivos/' . $documento->documento);
        }

        // Eliminar el registro en la base de datos
        $documento->delete();

        return response()->json([
            'status' => 'success',
            'msg' => 'Documento eliminado correctamente.'
        ], 200);
    }

    public function descargarDocumento(int $id)
    {
        // Buscar el documento por ID
        $documentoEquipo = InvDocumentoEquipo::find($id);

        if (!$documentoEquipo || !Storage::disk('public')->exists($documentoEquipo->documento)) {
            return response()->json(['status' => 'error', 'msg' => 'Documento no encontrado.'], 404);
        }

        // Devolver el archivo para que se descargue
        return Storage::disk('public')->download($documentoEquipo->documento);
    }

    public function bajaEquipo(Request $request, int $id): JsonResponse
    {
        try {
            // Encuentra el equipo por ID
            $equipo = InvEquipo::findOrFail($id);

            // Verifica si se proporciona una fecha de baja
            $fechaBaja = $request->input('fecha_baja');
            if (!$fechaBaja) {
                return response()->json([
                    'status' => 'error',
                    'msg'    => 'La fecha de baja es requerida.',
                ], 400);
            }

            // Actualiza el estado del equipo a 4 y la fecha de baja
            $equipo->update([
                'estado_id' => 4,
                'fecha_baja' => $fechaBaja,
            ]);

            // Verifica si se proporciona un array de periféricos
            if ($request->filled('perifericos')) {
                $perifericos = $request->input('perifericos');

                // Cambia el estado de los periféricos especificados a 4 y la fecha de baja
                $equipo->perifericos()
                    ->whereIn('id', $perifericos) // Filtra los periféricos a actualizar
                    ->update([
                        'estado_id'  => 4,
                        'fecha_baja' => $fechaBaja,
                    ]);
            }

            return response()->json([
                'status' => 'success',
                'msg'    => 'El equipo y los periféricos han sido dados de baja exitosamente.',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message'    => 'El equipo no fue encontrado.',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
