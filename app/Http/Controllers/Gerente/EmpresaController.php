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
        $empresas = Empresa::whereIn("idnom_empresa", [2,6,8,10])->get();
        return response()->json(['status' => MsgStatus::Success, 'empresas' => $empresas], 200);
    }
}
