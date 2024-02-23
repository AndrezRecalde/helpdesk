<?php

namespace App\Http\Controllers\Gerente;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CargoController extends Controller
{
    function getCargos(): JsonResponse
    {
        $cargos = Cargo::get();
        return response()->json(['status' => 'success', 'cargos' => $cargos], 200);
    }
}
