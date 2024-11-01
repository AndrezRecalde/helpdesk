<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    function getEmpresas(): JsonResponse
    {
        $empresas = Empresa::whereIn("idnom_empresa", [1,5,7,9])->get();
        return response()->json(['status' => MsgStatus::Success, 'empresas' => $empresas], 200);
    }
}
