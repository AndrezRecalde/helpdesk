<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Models\InvConsumible;
use App\Models\InvEquipo;
use App\Models\SolicitudConsumible;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SolicitudConsumibleController extends Controller
{
    /**
     * Listar solicitudes con filtros y paginación
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = SolicitudConsumible::with([
                'departamento:cdgo_dprtmnto,nmbre_dprtmnto',
                'usuarioAutoriza:cdgo_usrio,nmbre_usrio',
                'usuarioSolicita:cdgo_usrio,nmbre_usrio',
                'consumibles:id,nombre_consumible'
            ]);

            // Filtros opcionales
            if ($request->filled('departamento_id')) {
                $query->where('departamento_id', $request->departamento_id);
            }

            if ($request->filled('usuario_solicita')) {
                $query->where('usuario_solicita', $request->usuario_solicita);
            }

            if ($request->filled('anio')) {
                $query->whereYear('created_at', $request->anio);
            }

            if ($request->filled('fecha_desde')) {
                $query->whereDate('created_at', '>=', $request->fecha_desde);
            }

            if ($request->filled('fecha_hasta')) {
                $query->whereDate('created_at', '<=', $request->fecha_hasta);
            }

            // Paginación
            $perPage = $request->input('per_page', 10);
            $solicitudes = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'status' => MsgStatus::Success,
                'solicitudes' => $solicitudes->items(),
                'pagination' => [
                    'total' => $solicitudes->total(),
                    'por_pagina' => $solicitudes->perPage(),
                    'pagina_actual' => $solicitudes->currentPage(),
                    'ultima_pagina' => $solicitudes->lastPage(),
                    'desde' => $solicitudes->firstItem(),
                    'hasta' => $solicitudes->lastItem(),
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al listar solicitudes: ' . $e->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'error' => 'Error al obtener solicitudes'
            ], 500);
        }
    }

    /**
     * Crear nueva solicitud de consumibles
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'departamento_id' => 'required|integer|exists:dprtmntos,cdgo_dprtmnto',
            'usuario_solicita' => 'required|integer|exists:usrios_sstma,cdgo_usrio',
            //'usuario_autoriza' => 'required|integer|exists:usrios_sstma,cdgo_usrio',
            'equipo_id' => 'required|integer|exists:inv_equipos,id',
            'consumibles' => 'required|array|min:1',
            'consumibles.*.id' => 'required|exists:inv_consumibles,id',
            'consumibles.*.cantidad' => 'required|integer|min:1',
            'observaciones' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            // Validar que el equipo pertenezca al departamento del solicitante
            $equipo = InvEquipo::find($request->equipo_id);
            if ($equipo->direccion_id != $request->departamento_id) {
                throw new \Exception('El equipo seleccionado no pertenece al departamento del solicitante');
            }

            // Obtener el director del área (jefe del departamento)
            $departamento = Departamento::find($request->departamento_id);
            if (!$departamento || !$departamento->id_jefe) {
                throw new \Exception('El departamento seleccionado no tiene un director asignado');
            }

            //Consulta el jefe administrativo
            $directorAdministrativo = Departamento::find(1);
            if (!$directorAdministrativo || !$directorAdministrativo->id_jefe) {
                throw new \Exception('El departamento seleccionado no tiene un director asignado');
            }

            $directorTic = Departamento::find(22);
            if (!$directorTic || !$directorTic->id_jefe) {
                throw new \Exception('El departamento seleccionado no tiene un director asignado');
            }

            // Generar número de solicitud
            $numeroSolicitud = SolicitudConsumible::generarNumeroSolicitud();

            // Crear la solicitud con directores y fecha
            $solicitud = SolicitudConsumible::create([
                'numero_solicitud' => $numeroSolicitud,
                'departamento_id' => $request->departamento_id,
                'usuario_autoriza' => $directorAdministrativo->id_jefe,
                'usuario_solicita' => $request->usuario_solicita,
                'observaciones' => $request->observaciones,
                'director_area' => $departamento->id_jefe,
                'director_tic' => $directorTic->id_jefe,
                'fecha_solicitud' => now()->toDateString()
            ]);

            // Procesar cada consumible
            foreach ($request->consumibles as $item) {
                $consumible = InvConsumible::find($item['id']);

                // Validar stock disponible
                if (!$consumible || $consumible->stock < $item['cantidad']) {
                    throw new \Exception("No hay suficiente stock para '{$consumible->nombre_consumible}'. Disponible: {$consumible->stock}, Solicitado: {$item['cantidad']}");
                }

                // Reducir stock
                $consumible->reducirStock($item['cantidad']);

                // Registrar en tabla pivote solo con cantidad y equipo
                $solicitud->consumibles()->attach($item['id'], [
                    'cantidad_solicitada' => $item['cantidad'],
                    'equipo_id' => $request->equipo_id
                ]);
            }

            DB::commit();

            // Cargar relaciones para la respuesta
            $solicitud->load([
                'departamento:cdgo_dprtmnto,nmbre_dprtmnto',
                'usuarioAutoriza:cdgo_usrio,nmbre_usrio',
                'usuarioSolicita:cdgo_usrio,nmbre_usrio',
                'consumibles:id,nombre_consumible,codigo'
            ]);

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Solicitud creada exitosamente',
                'solicitud' => $solicitud
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al crear solicitud: ' . $e->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Ver detalle de una solicitud
     */
    public function show(int $id): JsonResponse
    {
        try {
            $solicitud = SolicitudConsumible::with([
                'departamento:cdgo_dprtmnto,nmbre_dprtmnto',
                'usuarioAutoriza:cdgo_usrio,nmbre_usrio',
                'usuarioSolicita:cdgo_usrio,nmbre_usrio',
                'consumibles' => function ($query) {
                    $query->select('inv_consumibles.id', 'nombre_consumible', 'codigo')
                        ->withPivot('cantidad_solicitada', 'equipo_id');
                }
            ])->findOrFail($id);

            return response()->json([
                'status' => MsgStatus::Success,
                'solicitud' => $solicitud
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al obtener solicitud: ' . $e->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'error' => 'Solicitud no encontrada'
            ], 404);
        }
    }

    /**
     * Exportar solicitud a PDF
     */
    public function exportPDF(int $id)
    {
        try {
            $solicitud = SolicitudConsumible::with([
                'departamento:cdgo_dprtmnto,nmbre_dprtmnto',
                'usuarioAutoriza:cdgo_usrio,nmbre_usrio',
                'usuarioSolicita:cdgo_usrio,nmbre_usrio',
                'consumibles' => function ($query) {
                    $query->select('inv_consumibles.id', 'nombre_consumible', 'codigo')
                        ->withPivot('cantidad_solicitada', 'equipo_id');
                }
            ])->findOrFail($id);

            $pdf = Pdf::loadView('pdf.consumible.solicitud_materiales', compact('solicitud'));

            return $pdf->setPaper('a4', 'portrait')->download("Solicitud_{$solicitud->numero_solicitud}.pdf");
        } catch (\Exception $e) {
            Log::error('Error al generar PDF: ' . $e->getMessage());
            return response()->json([
                'status' => MsgStatus::Error,
                'error' => 'Error al generar el PDF: ' . $e->getMessage()
            ], 500);
        }
    }
}
