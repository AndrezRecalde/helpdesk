<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    function getEmpresas(): JsonResponse
    {
        $empresas = Empresa::whereIn("id", [2,6,8,10])->get();
        return response()->json(['status' => 'success', 'empresas' => $empresas], 200);
    }
}
