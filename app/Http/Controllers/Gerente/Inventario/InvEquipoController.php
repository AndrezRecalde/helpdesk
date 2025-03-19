<?php

namespace App\Http\Controllers\Gerente\Inventario;

use Carbon\Carbon;
use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\EquipoDocumentoRequest;
use App\Http\Requests\EquipoInvRequest;
use App\Http\Requests\EquipoResponsableInvRequest;
use App\Http\Requests\InvAsignarCustodio;
use App\Models\InvCategoria;
//use App\Models\InvCategoria;
use App\Models\InvDocumentoEquipo;
use App\Models\InvEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;


class InvEquipoController extends Controller
{

    function buscarEquipoxUsuario(Request $request): JsonResponse
    {
        $userId = $request->input('user_id');
        $direccionId = $request->input('direccion_id');

        $equipos = InvCategoria::from('inv_categorias as invc')
            ->with([
                'equipos' => function ($query) use ($userId, $direccionId) {
                    $query->byUserId($userId)->byDireccion($direccionId);
                }
            ])
            ->selectRaw('invc.id, invc.nombre_categoria')
            ->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'equipos' => $equipos
        ], 200);
    }

    public function getEquiposInv(Request $request): JsonResponse
    {
        $campo = $request->input('campo', 'codigo'); // Campo por defecto
        $valor = $request->input('valor', '');

        // Mapear los nombres de campo con sus relaciones
        $mapaCampos = [
            'direccion'     => 'inve.direccion_id',
            'usuario'       => 'inve.user_id',
            'codigo'        => ['inve.codigo_nuevo', 'inve.codigo_antiguo'], // Buscar en ambos códigos
            'categoria'     => 'inve.categoria_id',
            'numero_serie'  => 'inve.numero_serie',
            'estado'        => 'inve.estado_id',
        ];

        if (!array_key_exists($campo, $mapaCampos)) {
            return response()->json([
                'status' => MsgStatus::Success,
                'msg'    => 'Campo no valido'
            ], 400);
        }

        // Construimos la consulta con selectRaw y joins
        $query = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id, inve.modelo, inve.numero_serie,
                     inve.codigo_antiguo, inve.codigo_nuevo,
                     inve.categoria_id, invc.nombre_categoria, inve.descripcion,
                     inve.estado_id, inves.nombre_estado, inves.color,
                     inve.marca_id, invm.nombre_marca,
                     inve.user_id, us.nmbre_usrio as responsable,
                     inve.direccion_id, d.nmbre_dprtmnto as direccion')
            ->join('inv_categorias as invc', 'invc.id', '=', 'inve.categoria_id')
            ->join('inv_estados as inves', 'inves.id', '=', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', '=', 'inve.marca_id')
            ->leftJoin('usrios_sstma as us', 'inve.user_id', '=', 'us.cdgo_usrio')
            ->leftJoin('dprtmntos as d', 'inve.direccion_id', '=', 'd.cdgo_dprtmnto');

        // Aplicar filtros si el valor no está vacío
        if (!empty($valor)) {
            if (is_array($mapaCampos[$campo])) {
                // Si el campo es un array (ej. código antiguo/nuevo), buscar en ambos con LIKE
                $query->where(function ($q) use ($mapaCampos, $campo, $valor) {
                    foreach ($mapaCampos[$campo] as $columna) {
                        $q->orWhere($columna, 'LIKE', "%{$valor}%");
                    }
                });
            } else {
                $query->where($mapaCampos[$campo], 'LIKE', "%{$valor}%");
            }
        }

        $equipos = $query->orderBy('inve.id', 'DESC')->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'equipos' => $equipos
        ], 200);
    }

    function show(int $id): JsonResponse
    {
        $equipo = InvEquipo::from('inv_equipos as inve')
            ->selectRaw('inve.id,
                            inve.codigo_antiguo, inve.codigo_nuevo,
                            inve.modelo, inve.numero_serie,
                            inve.fecha_adquisicion, inve.fecha_baja,
                            inve.vida_util, inve.descripcion,
                            inve.bien_adquirido, inve.bien_donado, inve.bien_usado,
                            inve.ubicacion_id, invu.nombre_ubicacion, invu.nombre_edificio,
                            inve.categoria_id, invc.nombre_categoria,
                            invt.id as tipocategoria_id, invt.nombre_tipocategoria,
                            inve.estado_id, inves.nombre_estado, inves.color,
                            inve.marca_id, invm.nombre_marca,
                            inve.user_id, us.nmbre_usrio as responsable,
                            inve.direccion_id, d.nmbre_dprtmnto as direccion')
            ->with([
                'usuarios',
                'documentos'
            ])
            ->join('inv_ubicaciones as invu', 'invu.id', 'inve.ubicacion_id')
            ->join('inv_categorias as invc', 'invc.id', 'inve.categoria_id')
            ->join('inv_tipocategorias as invt', 'invt.id', 'invc.tipocategoria_id')
            ->join('inv_estados as inves', 'inves.id', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            ->leftJoin('usrios_sstma as us', 'inve.user_id', 'us.cdgo_usrio')
            ->leftJoin('dprtmntos as d', 'inve.direccion_id', 'd.cdgo_dprtmnto')
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
            //$categoria = InvCategoria::find($request->categoria_id);

            // Registrar la relación con un usuario, si los campos correspondientes están presentes
            if ($request->filled('usuario_id') && $request->filled('direccion_id')) {
                $equipo->usuarios()->attach($request->usuario_id, [
                    'direccion_id' => $request->direccion_id,
                    'concepto_id'  => $request->concepto_id,
                    'observacion' =>  $request->observacion
                ]);
            }

            // Reducir el stock de la categoría relacionada
            //$categoria->agregarStock(1);

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
        //$categoria = InvCategoria::find($request->categoria_id);

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

                /* if ($categoria->id != $equipo->categoria_id) {
                    $categoria->agregarStock(1);
                } */

                DB::commit();  // Confirmar la transacción si todo sale bien

                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                DB::rollBack();  // Revertir la transacción en caso de error
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
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

    public function removeUserFromEquipo($equipo_id, $id): JsonResponse
    {
        // Buscar el equipo
        $equipo = InvEquipo::find($equipo_id);

        // Eliminar la relación entre el usuario y el equipo
        $equipo->usuarios()->wherePivot('id', $id)->detach();

        // Retornar una respuesta o redireccionar
        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => MsgStatus::Deleted
        ], 200);
    }

    function destroy(int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);
        //$categoria = InvCategoria::find($equipo->categoria_id);

        try {
            if ($equipo) {
                //$categoria->reducirStock(1);
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
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'Documento no encontrado.'], 404);
        }

        // Devolver el archivo para que se descargue
        return Storage::disk('public')->download($documentoEquipo->documento);
    }


    function removeCustodio(int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);

        // Verificar si el equipo existe
        if (!$equipo) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg'    => 'El equipo no fue encontrado.'
            ], 404);
        }

        // Actualizar el equipo_id a null
        $equipo->user_id = null;
        $equipo->direccion_id = null;
        $equipo->save();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => 'El custodio se desvinculó',
        ]);
    }

    function asignarCustodio(InvAsignarCustodio $request, int $id): JsonResponse
    {
        $equipo = InvEquipo::find($id);

        if (!$equipo) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => 'Equipo no encontrado',
            ], 404);
        }

        // Asignar los valores del custodio al equipo
        $equipo->user_id = $request->user_id;
        $equipo->direccion_id = $request->direccion_id;
        $equipo->save();

        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => 'El custodio se vinculó',
        ]);
    }


    function exportPDFEquipos(Request $request)
    {
        if (sizeof($request->equipos) >= 1) {
            $data = [
                'title' => 'Informe de reporte de Equipos',
                'equipos' => $request->equipos,
                'current_fecha' => Carbon::now()->format('Y-m-d')
            ];
            $pdf = Pdf::loadView('pdf.equipos.reporte', $data);
            return $pdf->setPaper('a4', 'landscape')->download('equipos.pdf');
        } else {
            return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
        }
    }
}
