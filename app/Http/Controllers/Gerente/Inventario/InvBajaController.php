<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Models\InvBaja;
use App\Models\InvEquipo;
use App\Models\Soporte;
use App\Models\User;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvBajaController extends Controller
{
    public function darDeBajaEquipos(Request $request)
    {
        $validatedData = $request->validate([
            'user_id'          => 'required|integer|exists:usrios_sstma,cdgo_usrio',
            'equipos'          => 'required|array',
            'equipos.*'        => 'integer|exists:inv_equipos,id',
            'numero_sop'       => 'required|string',
            'numero_memorando' => 'required|string',
        ]);

        // Forzar que los equipos sean enteros
        $validatedData['equipos'] = array_map('intval', $validatedData['equipos']);

        $equipos = InvEquipo::from('inv_equipos as inve')
            ->select(
                'inve.id',
                'inve.modelo',
                'inve.numero_serie',
                'inve.codigo_nuevo',
                'inve.codigo_antiguo',
                'inve.fecha_adquisicion',
                'invm.id as marca_id',
                'invm.nombre_marca',
                'us.cdgo_usrio',
                'us.nmbre_usrio as custodio'
            )
            ->join('inv_marcas as invm', 'invm.id', 'inve.marca_id')
            ->leftJoin('usrios_sstma as us', 'inve.user_id', 'us.cdgo_usrio')
            ->whereIn('inve.id', $request->equipos)
            ->get();


        // Consultar los directores de los departamentos 1 y 22 usando Eloquent
        $directores = Departamento::whereIn('cdgo_dprtmnto', [1, 22])
            ->with('jefe:cdgo_usrio,nmbre_usrio') // Relación con el jefe
            ->orderBy('cdgo_dprtmnto', 'asc')
            ->get(['cdgo_dprtmnto', 'id_jefe']);

        // Consultar datos del numero de soporte
        $soporte = Soporte::from('sop_soporte as ss')
                  ->select(
                    'ss.numero_sop', 'ss.solucion',
                    'ss.id_usu_tecnico_asig', 'us.nmbre_usrio as tecnico',
                    'ss.id_usu_recibe', 'usu.nmbre_usrio as solicitante',
                    'dp.nmbre_dprtmnto as direccion')
                  ->join('usrios_sstma as us', 'ss.id_usu_tecnico_asig', 'us.cdgo_usrio')
                  ->join('usrios_sstma as usu', 'ss.id_usu_recibe', 'usu.cdgo_usrio')
                  ->join('dprtmntos as dp', 'usu.cdgo_direccion', 'dp.cdgo_dprtmnto')
                  ->where('numero_sop', $request->numero_sop)
                  ->first();

        foreach ($equipos as $equipo) {
            $equipo->estado_id = 5;     // Id del estado de baja
            $equipo->fecha_baja = Carbon::now();
            $equipo->user_id = null;
            $equipo->direccion_id = null;
            $equipo->ubicacion_id = null;
            $equipo->save();

            // Registrar la baja en una tabla histórica
            InvBaja::create([
                'equipo_id'        => $equipo->id,
                'tecnico_id'       => $soporte->id_usu_tecnico_asig,
                'fecha_baja'       => now(),
                'numero_memorando' => $request->numero_memorando,
            ]);
        }

        // Generar el PDF de la baja
        return $this->generarPdfBaja(
            $equipos,
            $soporte['tecnico'],
            $soporte['numero_sop'],
            $soporte['solucion'],
            $directores,
            $request->numero_memorando,
            $soporte['direccion']
        );
    }

    public function generarPdfBaja($equipos, $tecnico, $numero_sop, $motivo, $directores, $numero_memorando, $direccion_solicitante)
    {
        $fechaActual = Carbon::now();
        $fecha = $fechaActual->translatedFormat('d \d\e F \d\e Y');
        $hora = $fechaActual->format('H:i');
        $anio = $fechaActual->year; // Obtiene solo el año

        // Cargar la vista del PDF con los datos
        $pdf = Pdf::loadView(
            'pdf.soporte.baja_equipo',
            compact(
                'equipos',
                'tecnico',
                'numero_sop',
                'motivo',
                'directores',
                'numero_memorando',
                'direccion_solicitante',
                'fecha',
                'hora',
                'anio', // Pasamos el año a la vista
            )
        );

        return $pdf->download("reporte_baja_equipos_{$anio}.pdf");
    }

    function destroy(int $id): JsonResponse
    {
        $equipoDeBaja = InvBaja::find($id);
        $equipo = InvEquipo::find($equipoDeBaja->equipo_id);

        try {
            if ($equipoDeBaja) {
                $equipoDeBaja->delete();
                $equipo->estado_id = 1;
                $equipo->save();
                return response()->json([
                    'status' => MsgStatus::Success,
                    'msg' => MsgStatus::Deleted
                ], 200);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => MsgStatus::NotFound
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
