<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DireccionController extends Controller
{
    function getDirecciones(): JsonResponse
    {
        $direcciones = Departamento::from('dprtmntos as d')
            ->selectRaw('d.cdgo_dprtmnto, d.nmbre_dprtmnto, d.cdgo_lrgo')
            //->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            //->where('d.id_empresa', $request->id_empresa)
            ->where('d.es_direccion', 1)
            ->where('d.interna', 1)
            ->get();
        return response()->json(['status' => 'success', 'direcciones' => $direcciones], 200);
    }
}
