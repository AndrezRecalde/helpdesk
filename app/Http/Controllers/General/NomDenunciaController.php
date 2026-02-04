<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\NomDenuncia;
use Illuminate\Http\Request;

class NomDenunciaController extends Controller
{
    public function getDenuncias(Request $request)
    {
        try {
            $denuncias = NomDenuncia::byUsuarioId($request->usuario_id)->get();

            return response()->json([
                'status' => 'success',
                'denuncias' => $denuncias
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function store() {}

    public function update() {}
}
