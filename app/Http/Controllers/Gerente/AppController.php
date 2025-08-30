<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppController extends Controller
{
    function getImagenesApp(): JsonResponse
    {
        try {
            $imagenes = Application::get();
            return response()->json(['status' => MsgStatus::Success, 'imagenes' => $imagenes], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    function update(ApplicationRequest $request, int $id): JsonResponse
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => 'No se encontró la configuración de la aplicación.'], 404);
        }
        try {
            $application->update($request->validated());
            return response()->json(['status' => MsgStatus::Success, 'msg' => 'Configuración de la aplicación actualizada correctamente.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatus::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
