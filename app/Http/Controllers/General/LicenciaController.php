<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\SoporteLicenciaEquipo;
use Illuminate\Http\Request;

use App\Models\SoporteContrato;
use App\Models\SoporteLicencia;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Exports\ReporteLicenciasExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class LicenciaController extends Controller
{
    /**
     * Get all contracts with their licenses.
     */
    public function getContracts()
    {
        try {
            $contracts = SoporteContrato::with('licencias')->orderBy('id_contrato', 'desc')->get();
            return response()->json([
                'ok' => true,
                'contratos' => $contracts
            ]);
        } catch (Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al obtener los contratos: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new contract and its licenses.
     */
    public function createContract(Request $request)
    {
        $request->validate([
            'codigo_contrato' => 'required|string|max:100|unique:sop_contratos,codigo_contrato',
            'licencias' => 'required|array|min:1',
            'licencias.*.nombre' => 'required|string|max:150',
            'licencias.*.fecha_vencimiento' => 'required|date',
            'activo' => 'boolean'
        ]);

        try {
            DB::beginTransaction();

            $isActivating = $request->input('activo', false);

            if ($isActivating) {
                // Deactivate all other contracts
                SoporteContrato::query()->update(['activo' => false]);
            }

            $contrato = SoporteContrato::create([
                'codigo_contrato' => $request->codigo_contrato,
                'activo' => $isActivating
            ]);

            foreach ($request->licencias as $licencia) {
                SoporteLicencia::create([
                    'id_contrato' => $contrato->id_contrato,
                    'nombre' => $licencia['nombre'],
                    'fecha_vencimiento' => $licencia['fecha_vencimiento']
                ]);
            }

            DB::commit();

            return response()->json([
                'ok' => true,
                'message' => 'Contrato creado correctamente.',
                'contrato' => $contrato->load('licencias')
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'ok' => false,
                'message' => 'Error al crear el contrato: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing contract and its licenses.
     */
    public function updateContract(Request $request, $id)
    {
        $request->validate([
            'codigo_contrato' => 'required|string|max:100|unique:sop_contratos,codigo_contrato,' . $id . ',id_contrato',
            'licencias' => 'required|array|min:1',
            'licencias.*.nombre' => 'required|string|max:150',
            'licencias.*.fecha_vencimiento' => 'required|date'
        ]);

        try {
            DB::beginTransaction();
            $contrato = SoporteContrato::findOrFail($id);
            $contrato->codigo_contrato = $request->codigo_contrato;
            $contrato->save();

            // Clear old licenses
            $contrato->licencias()->delete();

            // Insert new/updated ones
            foreach ($request->licencias as $licencia) {
                SoporteLicencia::create([
                    'id_contrato' => $contrato->id_contrato,
                    'nombre' => $licencia['nombre'],
                    'fecha_vencimiento' => $licencia['fecha_vencimiento']
                ]);
            }

            DB::commit();

            return response()->json([
                'ok' => true,
                'message' => 'Contrato actualizado correctamente.',
                'contrato' => $contrato->load('licencias')
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'ok' => false,
                'message' => 'Error al actualizar el contrato: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a contract.
     */
    public function deleteContract($id)
    {
        try {
            $contrato = SoporteContrato::findOrFail($id);
            if ($contrato->activo) {
                return response()->json([
                    'ok' => false,
                    'message' => 'No se puede eliminar un contrato que está activo actualmente.'
                ], 400);
            }
            // Cascades deletes to sop_licencias based on db migration
            $contrato->delete();

            return response()->json([
                'ok' => true,
                'message' => 'Contrato eliminado correctamente.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al eliminar el contrato: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Activate a specific contract (and deactivate the others).
     */
    public function activateContract($id)
    {
        try {
            DB::beginTransaction();
            $contrato = SoporteContrato::findOrFail($id);

            // Deactivate all
            SoporteContrato::query()->update(['activo' => false]);

            // Activate the specific one
            $contrato->activo = true;
            $contrato->save();

            DB::commit();

            return response()->json([
                'ok' => true,
                'message' => 'Contrato marcado como activo exitosamente.',
                'contrato' => $contrato
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'ok' => false,
                'message' => 'Error al activar el contrato: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Get installations report by date range.
     */
    public function getInstalaciones(Request $request)
    {
        $request->validate([
            'id_contrato' => 'required|integer',
            'id_licencia' => 'nullable|integer'
        ]);

        try {
            $query = SoporteLicenciaEquipo::with([
                'soporte',
                'equipo.usuario',
                'licencia.contrato'
            ])
                ->whereHas('licencia', function ($q) use ($request) {
                    $q->where('id_contrato', $request->id_contrato);
                });

            if ($request->filled('id_licencia')) {
                $query->where('id_licencia', $request->id_licencia);
            }

            $instalaciones = $query->orderBy('fecha_instalacion', 'desc')->get();

            return response()->json([
                'ok' => true,
                'instalaciones' => $instalaciones
            ]);
        } catch (Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al obtener instalaciones: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Export installations report to PDF.
     */
    public function exportPDF(Request $request)
    {
        $request->validate([
            'id_contrato' => 'required|integer',
            'id_licencia' => 'nullable|integer'
        ]);

        try {
            $query = SoporteLicenciaEquipo::with([
                'soporte',
                'equipo.usuario',
                'licencia.contrato'
            ])
                ->whereHas('licencia', function ($q) use ($request) {
                    $q->where('id_contrato', $request->id_contrato);
                });

            if ($request->filled('id_licencia')) {
                $query->where('id_licencia', $request->id_licencia);
            }

            $instalaciones = $query->orderBy('fecha_instalacion', 'desc')->get();
            $usuarioGenerador = Auth::user();

            $pdf = Pdf::loadView('pdf.soporte.licencias', compact('instalaciones', 'usuarioGenerador'));

            return $pdf->download('reporte_licencias.pdf');

        } catch (Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al exportar PDF: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Export installations report config array to Excel matching Blade styles logic.
     */
    public function exportExcel(Request $request)
    {
        $request->validate([
            'id_contrato' => 'required|integer',
            'id_licencia' => 'nullable|integer'
        ]);

        try {
            $query = SoporteLicenciaEquipo::with([
                'soporte',
                'equipo.usuario',
                'licencia.contrato'
            ])
                ->whereHas('licencia', function ($q) use ($request) {
                    $q->where('id_contrato', $request->id_contrato);
                });

            if ($request->filled('id_licencia')) {
                $query->where('id_licencia', $request->id_licencia);
            }

            $instalaciones = $query->orderBy('fecha_instalacion', 'desc')->get();

            return Excel::download(new ReporteLicenciasExport($instalaciones), 'reporte_licencias.xlsx');

        } catch (Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al exportar Excel: ' . $e->getMessage()
            ], 500);
        }
    }
}
