<?php

namespace App\Http\Controllers\Gerente\Inventario;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\InvDocumentoRequest;
use App\Models\InvDocumentoEquipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvDocumentoController extends Controller
{
    function getDocumentosForEquipos(Request $request): JsonResponse
    {
        $documentos = InvDocumentoEquipo::where('equipo_id', $request->equipo_id)->get();

        return response()->json([
            'status' => MsgStatus::Success,
            'documentos' => $documentos
        ], 200);
    }

    function store(InvDocumentoRequest $request): JsonResponse
    {
        try {
            $documento = InvDocumentoEquipo::create($request->validated());

            $archivo = $request->file('documento');
            $filename = 'archivo_' . uniqid() . '.' . $archivo->getClientOriginalExtension();
            $save_path = '/documentos/equipos/' . date('Y') . '/';
            $public_path = $save_path . $filename;
            $path = Storage::putFileAs(
                'public' . $save_path,
                $archivo,
                $filename
            );

            if (!$path) {
                DB::rollBack();
                return response()->json(['status' => MsgStatus::Error, 'msg' => 'Error al cargar el archivo'], 500);
            }
            $documento->documento = $public_path;
            $documento->save();
            return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Created], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    /* function update(InvDocumentoRequest $request, int $id): JsonResponse
    {
        $documento = InvDocumentoEquipo::find($id);
        try {
            if ($documento) {
                $documento->update($request->validated());
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    } */

    function destroy(int $id): JsonResponse
    {
        $documento = InvDocumentoEquipo::find($id);
        try {
            if ($documento) {
                $documento->delete();
                return response()->json(['status' => MsgStatus::Success, 'msg' => MsgStatus::Updated], 201);
            } else {
                return response()->json(['status' => MsgStatus::Error, 'msg' => MsgStatus::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
