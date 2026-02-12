<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResponderDenunciaRequest;
use App\Mail\DenunciaMail;
use App\Models\NomDenuncia;
use App\Models\NomDenunciaArchivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class DenunciaAdminController extends Controller
{
    /**
     * Listar todas las denuncias con filtros
     */
    public function index(Request $request)
    {
        $query = NomDenuncia::query()
            ->with(['archivos', 'respondidoPor']);

        // Filtros
        if ($request->has('estado') && $request->estado) {
            $query->byEstado($request->estado);
        }

        if ($request->has('tipo_denuncia') && $request->tipo_denuncia) {
            $query->byTipo($request->tipo_denuncia);
        }

        if ($request->has('fecha_desde') || $request->has('fecha_hasta')) {
            $query->byFechas($request->fecha_desde, $request->fecha_hasta);
        }

        if ($request->has('anio') && $request->anio) {
            $query->whereYear('created_at', $request->anio);
        }

        // Ordenar por más recientes
        $query->orderBy('created_at', 'desc');

        // Paginación
        $perPage = $request->get('per_page', 15);
        $denuncias = $query->paginate($perPage);

        // Formatear respuesta
        $data = $denuncias->map(function ($denuncia) {
            $infoUsuario = $denuncia->getInfoUsuario();

            return [
                'id' => $denuncia->id,
                'numero_denuncia' => $denuncia->numero_denuncia,
                'tipo_denuncia' => $denuncia->tipo_denuncia,
                'descripcion' => substr($denuncia->descripcion, 0, 200) . (strlen($denuncia->descripcion) > 200 ? '...' : ''),
                'estado' => $denuncia->estado,
                'fecha_creacion' => $denuncia->created_at->format('Y-m-d H:i:s'),
                'archivos_count' => $denuncia->archivos->count(),
                'mostrar_informacion' => $denuncia->mostrar_informacion,
                'usuario' => $infoUsuario,
                'tiene_respuesta' => !is_null($denuncia->respuesta),
                'fecha_respuesta' => $denuncia->fecha_respuesta?->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'status' => MsgStatus::Success,
            'data' => $data,
            'pagination' => [
                'total' => $denuncias->total(),
                'per_page' => $denuncias->perPage(),
                'current_page' => $denuncias->currentPage(),
                'last_page' => $denuncias->lastPage(),
                'from' => $denuncias->firstItem(),
                'to' => $denuncias->lastItem(),
            ],
        ]);
    }

    /**
     * Mostrar una denuncia específica
     */
    public function show($id)
    {
        $denuncia = NomDenuncia::with(['archivos', 'respondidoPor'])
            ->find($id);

        if (!$denuncia) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Denuncia no encontrada',
            ], 404);
        }

        $infoUsuario = $denuncia->getInfoUsuario();

        return response()->json([
            'status' => MsgStatus::Success,
            'data' => [
                'id' => $denuncia->id,
                'numero_denuncia' => $denuncia->numero_denuncia,
                'tipo_denuncia' => $denuncia->tipo_denuncia,
                'descripcion' => $denuncia->descripcion,
                'estado' => $denuncia->estado,
                'respuesta' => $denuncia->respuesta,
                'fecha_respuesta' => $denuncia->fecha_respuesta?->format('Y-m-d H:i:s'),
                'fecha_creacion' => $denuncia->created_at->format('Y-m-d H:i:s'),
                'mostrar_informacion' => $denuncia->mostrar_informacion,
                'usuario' => $infoUsuario,
                'respondido_por' => $denuncia->respondidoPor ? [
                    'nombre' => $denuncia->respondidoPor->nmbre_usrio,
                    'email' => $denuncia->respondidoPor->email,
                ] : null,
                'archivos' => $denuncia->archivos->map(function ($archivo) {
                    return [
                        'id' => $archivo->id,
                        'nombre_original' => $archivo->nombre_original,
                        'tamano' => $archivo->tamano_formateado,
                        'tipo_mime' => $archivo->tipo_mime,
                        'extension' => $archivo->extension,
                        'fecha_subida' => $archivo->created_at->format('Y-m-d H:i:s'),
                    ];
                }),
            ],
        ]);
    }

    /**
     * Responder a una denuncia
     */
    public function responder(ResponderDenunciaRequest $request, $id)
    {
        $denuncia = NomDenuncia::find($id);

        if (!$denuncia) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Denuncia no encontrada',
            ], 404);
        }

        try {
            $admin = Auth::user();

            $denuncia->respuesta = $request->respuesta;
            $denuncia->estado = $request->estado;
            $denuncia->fecha_respuesta = now();
            $denuncia->respondido_por = $admin->cdgo_usrio;
            $denuncia->save();

            // Enviar notificación al usuario
            $this->enviarNotificacionRespuesta($denuncia);

            return response()->json([
                'status' => MsgStatus::Success,
                'message' => 'Respuesta enviada exitosamente',
                'data' => [
                    'numero_denuncia' => $denuncia->numero_denuncia,
                    'estado' => $denuncia->estado,
                    'fecha_respuesta' => $denuncia->fecha_respuesta->format('Y-m-d H:i:s'),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al responder la denuncia: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualizar solo el estado de una denuncia
     */
    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:PENDIENTE,EN_PROCESO,RESUELTO,RECHAZADO',
        ]);

        $denuncia = NomDenuncia::find($id);

        if (!$denuncia) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Denuncia no encontrada',
            ], 404);
        }

        $denuncia->estado = $request->estado;
        $denuncia->save();

        return response()->json([
            'status' => MsgStatus::Success,
            'message' => 'Estado actualizado exitosamente',
            'data' => [
                'numero_denuncia' => $denuncia->numero_denuncia,
                'estado' => $denuncia->estado,
            ],
        ]);
    }

    /**
     * Descargar un archivo adjunto
     */
    public function descargarArchivo($archivo_id)
    {
        $archivo = NomDenunciaArchivo::find($archivo_id);

        if (!$archivo) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Archivo no encontrado',
            ], 404);
        }

        if (!$archivo->exists()) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'El archivo no existe en el servidor',
            ], 404);
        }

        return Storage::download($archivo->ruta_archivo, $archivo->nombre_original);
    }

    /**
     * Obtener estadísticas de denuncias
     */
    public function estadisticas(Request $request)
    {
        $year = $request->get('anio');

        $query = NomDenuncia::query();

        if ($year) {
            $query->whereYear('created_at', $year);
        }

        $total = (clone $query)->count();
        $pendientes = (clone $query)->where('estado', 'PENDIENTE')->count();
        $enProceso = (clone $query)->where('estado', 'EN_PROCESO')->count();
        $resueltas = (clone $query)->where('estado', 'RESUELTO')->count();
        $rechazadas = (clone $query)->where('estado', 'RECHAZADO')->count();

        $porTipo = (clone $query)->select('tipo_denuncia', \DB::raw('count(*) as total'))
            ->groupBy('tipo_denuncia')
            ->get()
            ->pluck('total', 'tipo_denuncia');

        return response()->json([
            'status' => MsgStatus::Success,
            'data' => [
                'total' => $total,
                'por_estado' => [
                    'pendientes' => $pendientes,
                    'en_proceso' => $enProceso,
                    'resueltas' => $resueltas,
                    'rechazadas' => $rechazadas,
                ],
                'por_tipo' => $porTipo,
            ],
        ]);
    }

    /**
     * Enviar notificación de respuesta al usuario
     */
    private function enviarNotificacionRespuesta(NomDenuncia $denuncia): void
    {
        try {
            // Obtener el usuario
            $usuario = \App\Models\User::find($denuncia->usuario_id);

            if ($usuario && $usuario->email) {
                Mail::to($usuario->email)->send(new DenunciaMail($denuncia, 'respuesta'));
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error("Error enviando email de respuesta de denuncia: " . $e->getMessage());
        }
    }
}
