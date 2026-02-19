<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $permissions = Permission::all();
            return response()->json([
                'status' => MsgStatus::Success,
                'permissions' => $permissions
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:permissions,name']
        ]);

        try {
            $permission = Permission::create(['name' => $request->name, 'guard_name' => 'web']);
            return response()->json([
                'status' => MsgStatus::Success,
                'message' => 'Permiso creado exitosamente',
                'permission' => $permission
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al crear el permiso: ' . $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $permission = Permission::find($id);

            if (!$permission) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Permiso no encontrado'
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'permission' => $permission
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $permission = Permission::find($id);

            if (!$permission) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Permiso no encontrado'
                ], 404);
            }

            $request->validate([
                'name' => ['required', 'string', Rule::unique('permissions', 'name')->ignore($permission->id)]
            ]);

            $permission->update(['name' => $request->name]);
            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Permiso actualizado exitosamente',
                'permission' => $permission
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al actualizar el permiso: ' . $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $permission = Permission::find($id);

            if (!$permission) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'Permiso no encontrado'
                ], 404);
            }

            $permission->delete();
            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Permiso eliminado exitosamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al eliminar el permiso: ' . $th->getMessage()
            ], 500);
        }
    }
}
