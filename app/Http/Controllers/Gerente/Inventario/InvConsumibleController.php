<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\Request;
use App\Models\InvConsumible;
use App\Http\Requests\InvConsumibleRequest;
use App\Models\InvEquipo;
use App\Models\User;
/* use App\Http\Requests\StatusRequest;
use App\Models\InvCategoria; */
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class InvConsumibleController extends Controller
{
    // CRUD
    /* public function getInvConsumibles(Request $request): JsonResponse
    {
        $consumibles = InvConsumible::from('inv_consumibles as invcon')
            ->selectRaw('invcon.id, invcon.nombre_consumible, invcon.codigo,
                                 invcon.categoria_id, invc.nombre_categoria, invcon.activo, invcon.stock')
            ->join('inv_categorias as invc', 'invc.id', 'invcon.categoria_id')
            ->byCategoriaId($request->categoria_id)
            ->latest('invcon.id')->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'consumibles' => $consumibles
        ], 200);
    } */

    //getInvConsumibles con Eloquent
    public function getInvConsumibles(Request $request): JsonResponse
    {
        $consumibles = InvConsumible::with('categoria')
            ->byCategoriaId($request->categoria_id)
            ->latest('id')
            ->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'consumibles' => $consumibles
        ], 200);
    }

    public function store(InvConsumibleRequest $request): JsonResponse
    {

        try {
            DB::beginTransaction();  // Iniciar transacción

            $consumible = InvConsumible::create($request->validated());
            // $categoria = InvCategoria::find($request->categoria_id);

            $consumible->agregarStock(1);
            //$categoria->agregarStock(1);
            DB::commit();  // Confirmar la transacción si todo sale bien

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => MsgStatus::Created
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    public function update(InvConsumibleRequest $request, int $id): JsonResponse
    {
        $consumible = InvConsumible::find($id);
        //$categoria = InvCategoria::find($request->categoria_id);
        try {
            if ($consumible) {

                DB::beginTransaction();  // Iniciar la transacción
                $consumible->update($request->validated());

                //Si stock esta igual a 0, desactivar la categoria
                if ($consumible->stock == 0) {
                    $consumible->activo = false;
                } else {
                    $consumible->activo = true;
                }

                $consumible->save();

                DB::commit();  // Confirmar la transacción si todo sale bien
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                DB::rollBack();  // Revertir la transacción en caso de error
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            DB::rollBack();  // Revertir la transacción en caso de error
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $consumible = InvConsumible::find($id);
        //$categoria = InvCategoria::find($consumible->categoria_id);

        try {
            if ($consumible) {
                $consumible->reducirStock(1);
                //$categoria->reducirStock(1);
                $consumible->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Deleted], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    public function incrementarStock(Request $request, int $id): JsonResponse
    {
        $consumible = InvConsumible::find($id);
        $consumible->agregarStock($request->stock);

        return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
    }


    public function solicitarConsumible(Request $request)
    {
        $request->validate([
            'departamento_id' => 'required|exists:dprtmntos,cdgo_dprtmnto',
            'usuario_solicita' => 'required|exists:usrios_sstma,cdgo_usrio',
            'consumibles' => 'required|array',
            'consumibles.*.id' => 'required|exists:inv_consumibles,id',
            'consumibles.*.cantidad' => 'required|integer|min:1',
            'usuario_autoriza' => 'required|exists:usrios_sstma,cdgo_usrio',
        ]);

        try {
            // Inicializar variable para el PDF
            $pdfData = [];

            DB::transaction(function () use ($request, &$pdfData) {
                // Obtener datos principales
                $departamento = Departamento::findOrFail($request->departamento_id);
                $autoriza = User::where('cdgo_usrio', $request->usuario_autoriza)->first(['cdgo_usrio', 'nmbre_usrio']);
                $solicita = User::where('cdgo_usrio', $request->usuario_solicita)->first(['cdgo_usrio', 'nmbre_usrio']);
                $director = Departamento::where('cdgo_dprtmnto', $request->departamento_id)
                    ->with('jefe:cdgo_usrio,nmbre_usrio')
                    ->first();
                $directorTic = Departamento::where('cdgo_dprtmnto', 22)
                    ->with('jefe:cdgo_usrio,nmbre_usrio')
                    ->first();
                $equipo = InvEquipo::where('id', $request->equipo_id)->first(['id', 'codigo_nuevo', 'codigo_antiguo']);

                if (!$director) {
                    throw new \Exception('No se encontró el director del departamento.');
                }

                // Preparar datos para el PDF
                $pdfData = [
                    'fecha' => $request->fecha === null ? now()->format('Y-m-d') : $request->fecha,
                    'departamento' => $departamento->nmbre_dprtmnto,
                    'consumibles' => [],
                    'usuario_solicita' => $solicita->nmbre_usrio,
                    'usuario_autoriza' => $autoriza->nmbre_usrio,
                    'director_area' => $director->jefe->nmbre_usrio,
                    'director_tic' => $directorTic->jefe->nmbre_usrio,
                    'codigo_nuevo' => $equipo->codigo_nuevo
                ];

                foreach ($request->consumibles as $item) {
                    $consumible = InvConsumible::find($item['id']);

                    if (!$consumible || $consumible->stock < $item['cantidad']) {
                        throw new \Exception("No hay suficiente stock para '{$consumible->nombre_consumible}'.");
                    }

                    // Reducir stock
                    $consumible->reducirStock($item['cantidad']);

                    // Agregar consumible al array para el PDF
                    $pdfData['consumibles'][] = [
                        'id' => $item['id'],
                        'nombre_consumible' => $consumible->nombre_consumible,
                        'codigo' => $consumible->codigo,
                        'cantidad_solicitada' => $item['cantidad'],
                        //'fecha'             => $request->fecha === null ? now()->format('d/m/Y') : $request->fecha,
                    ];

                    // Registrar en tabla pivote
                    $departamento->consumibles()->attach($item['id'], [
                        'cantidad_solicitada' => $item['cantidad'],
                        'usuario_autoriza' => $request->usuario_autoriza,
                        'usuario_solicita' => $request->usuario_solicita,
                        'equipo_id' => $equipo->id,
                        'director_area' => $director->jefe->cdgo_usrio,
                        'director_tic' => $directorTic->jefe->cdgo_usrio,
                        'fecha' => $request->fecha === null ? now()->format('Y-m-d') : $request->fecha
                    ]);
                }
            });

            // Generar el PDF fuera de la transacción
            /* return response()->json(['status' => 'success', 'data' => $pdfData], 201); */
            $pdf = Pdf::loadView('pdf.consumible.solicitud_materiales', compact('pdfData'));

            return $pdf->setPaper('a4', 'portrait')->download('Solicitud_Materiales.pdf');
        } catch (\Exception $e) {
            Log::error('Error al crear solicitud: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'error' => $e->getMessage()], 400);
        }
    }
}
