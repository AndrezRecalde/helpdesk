<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AnularSoporteRequest;
use App\Http\Requests\SolicitudAdminRequest;
use App\Http\Requests\SoporteAsignarcionRequest;
use App\Http\Requests\SoporteRequest;
use App\Mail\SoporteMail;
use App\Models\Soporte;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class SoporteAdminController extends Controller
{

    //SE ENVÍA AL CORREO AL TECNICO
    //Mail::to($tecnico->email)->queue(new SoporteMail($request));

    function asignarSoporte(SoporteAsignarcionRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {

            if ($soporte) {
                $soporte->update($request->validated());
                $soporte->id_usu_tecnico = $request->id_usu_tecnico_asig;
                $soporte->id_estado = 5;
                $soporte->fecha_asig = Carbon::now();
                $soporte->save();

                $tecnico = User::where("cdgo_usrio", $request->id_usu_tecnico_asig)
                    ->first(['cdgo_usrio', 'email']);

                $soporte_asignado = Soporte::from('sop_soporte as ss')
                    ->selectRaw('ss.id_sop, ss.numero_sop,
                                ss.id_direccion, d.nmbre_dprtmnto as direccion,
                                ss.id_usu_tecnico_asig, u.nmbre_usrio as tecnico,
                                ss.id_usu_recibe, us.nmbre_usrio as solicitante, us.email,
                                ss.incidente, ss.fecha_ini')
                    ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
                    ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_tecnico_asig')
                    ->join('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_recibe')
                    ->where('ss.id_sop', $id_sop)
                    ->first();

                Mail::to($tecnico->email)->send(new SoporteMail($soporte_asignado));
                return response()->json(['status' => 'success', 'msg' => 'Soporte Asignado'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function anularSoportes(AnularSoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->fill($request->validated());
                $soporte->id_estado = 2;
                $soporte->save();
                return response()->json(['status' => 'success', 'msg' => 'Soporte anulado'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function getSoporteAnulados(Request $request): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.anio, ss.numero_sop,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.fecha_ini, ss.incidente, ss.obs_anulado,
                        ss.id_area_tic, sat.nombre as area_tic,
                        ss.id_estado, se.nombre as estado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->join('sop_estado as se', 'se.id_estado_caso', 'ss.id_estado')
            ->leftJoin('sop_areas_tic as sat', 'sat.id_areas_tic', 'ss.id_area_tic')
            ->where('ss.id_estado', 2)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        if (sizeof($soportes) >= 1) {
            return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen soportes anulados en ese rango de fechas'], 404);
        }
    }

    function crearSolicitudAdmin(SolicitudAdminRequest $request): JsonResponse
    {
        try {
            $soporte = Soporte::create($request->validated());

            if ($request->id_usu_tecnico_asig) {
                $soporte->id_estado = 5;
                $tecnico = User::where("cdgo_usrio", $request->id_usu_tecnico_asig)
                    ->first(['cdgo_usrio', 'email']);
                Mail::to($tecnico->email)->send(new SoporteMail($soporte));
                $soporte->save();
            } else {
                $soporte->id_estado = 1;
                $soporte->save();
            }

            return response()->json(
                [
                    'status' => 'success',
                    'msg' => 'Solicitud creada con éxito'
                ],
                200
            );
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    function updateSoporte(SoporteRequest $request, int $id_sop): JsonResponse
    {
        $soporte = Soporte::find($id_sop);
        try {
            if ($soporte) {
                $soporte->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 200);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Soporte no encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }


    /* REPORTES: INDICADORES */
    function getIndicadoresSoportes(Request $request): JsonResponse
    {
        $desempenoForEstados = DB::select('CALL sop_get_desempeno_for_estados(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForAreas =   DB::select('CALL sop_get_desempeno_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForTecnicos = DB::select('CALL sop_get_desempeno_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForAreas = DB::select('CALL sop_get_efectividad_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForTecnicos = DB::select('CALL sop_get_efectividad_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $sumaDiasHabiles = DB::select('CALL sop_get_dias_habiles(?,?)', [$request->fecha_inicio, $request->fecha_fin]);


        /* SUMATORIA DE TOTAL DE CASOS EN DESEMPEÑO */
        $sumaDesempenoForEstados = 0;
        if (sizeof($desempenoForEstados) > 0) {
            foreach ($desempenoForEstados as $total_estados) {
                $sumaDesempenoForEstados += $total_estados->total_estados;
            }
        }

        return response()->json([
            'status' => 'success',
            'desempenoForEstados'     => $desempenoForEstados,
            'sumaDesempenoForEstados' => $sumaDesempenoForEstados,
            'desempenoForAreas' => $desempenoForAreas,
            'desempenoForTecnicos' => $desempenoForTecnicos,
            'efectividadForAreas'  => $efectividadForAreas,
            'efectividadForTecnicos' => $efectividadForTecnicos,
            'sumaDiasHabiles'       => $sumaDiasHabiles
        ], 200);
    }

    function exportPDFIndicadores(Request $request)
    {
        $desempenoForEstados = DB::select('CALL sop_get_desempeno_for_estados(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForAreas =   DB::select('CALL sop_get_desempeno_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $desempenoForTecnicos = DB::select('CALL sop_get_desempeno_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForAreas = DB::select('CALL sop_get_efectividad_for_areas(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $efectividadForTecnicos = DB::select('CALL sop_get_efectividad_for_tecnicos(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $sumaDiasHabiles = DB::select('CALL sop_get_dias_habiles(?,?)', [$request->fecha_inicio, $request->fecha_fin]);
        $usuarioGenerador = User::from('usrios_sstma as us')
            ->selectRaw('us.cdgo_usrio, us.nmbre_usrio as generador, nc.nom_cargo as cargo_generador,
                                        u.nmbre_usrio as director, ncd.nom_cargo as cargo_director')
            ->join('nom_cargo as nc', 'nc.idnom_cargo', 'us.crgo_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'us.cdgo_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'd.id_jefe')
            ->join('nom_cargo as ncd', 'ncd.idnom_cargo', 'u.crgo_id')
            ->where('us.cdgo_usrio', auth()->id())->first();

        /* SUMATORIA DE TOTAL DE CASOS EN DESEMPEÑO */
        $sumaDesempenoForEstados = 0;
        if (sizeof($desempenoForEstados) > 0) {
            foreach ($desempenoForEstados as $total_estados) {
                $sumaDesempenoForEstados += $total_estados->total_estados;
            }
        }

        $data = [
            'direccion'     =>  'Dirección de Técnologias de Informacion y Comunicación',
            'titulo'        =>  'Reporte General de Indicadores',
            'fecha_inicio'  =>  '01/01/2023',
            'fecha_fin'     =>  '31/12/2023',
            'desempenoForEstados'     => $desempenoForEstados,
            'sumaDesempenoForEstados' => $sumaDesempenoForEstados,
            'desempenoForAreas' => $desempenoForAreas,
            'desempenoForTecnicos' => $desempenoForTecnicos,
            'efectividadForAreas'  => $efectividadForAreas,
            'efectividadForTecnicos' => $efectividadForTecnicos,
            'sumaDiasHabiles'       => $sumaDiasHabiles,
            'usuarioGenerador'      => $usuarioGenerador
        ];
        $pdf = Pdf::loadView('pdf.soporte.indicador', $data);
        return $pdf->setPaper('a4', 'portrait')->download('indicador.pdf');
        /* return response()->json(['status' => 'success', 'data' => $data]); */
    }

    function getSoportesSinCalificacion(): JsonResponse
    {
        $soportes = Soporte::from('sop_soporte as ss')
            ->selectRaw('ss.id_sop, ss.numero_sop, ss.fecha_ini,
                        ss.id_direccion, d.nmbre_dprtmnto as direccion,
                        ss.id_usu_recibe, u.nmbre_usrio as usuario_recibe,
                        ss.id_usu_tecnico_asig, us.nmbre_usrio as tecnico_asignado')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ss.id_direccion')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'ss.id_usu_recibe')
            ->leftJoin('usrios_sstma as us', 'us.cdgo_usrio', 'ss.id_usu_tecnico_asig')
            ->where('ss.id_estado', 3)
            ->where('ss.id_calificacion', 3)
            ->orderBy('ss.numero_sop', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'soportes' => $soportes], 200);
    }

    function setCalificacionSoportes(Request $request): JsonResponse
    {
        Soporte::whereIn('id_sop', [$request->id_soportes])->update(['id_calificacion' => 5, 'id_estado' => 4]);

        return response()->json(['status' => 'success', 'msg' => 'Se ha(n) actualizado correctamente'], 200);
    }
}
