<?php

namespace App\Http\Controllers\Gerente;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $roles = Role::with('permissions')->get();
            return response()->json([
                'status' => MsgStatus::Success,
                'roles' => $roles
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
            'name' => ['required', 'string', 'unique:roles,name'],
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,name'] // Validate permission names exist
        ]);

        try {
            DB::beginTransaction();

            $role = Role::create(['name' => $request->name, 'guard_name' => 'web']);

            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'message' => 'Rol creado exitosamente',
                'role' => $role->load('permissions')
            ], 201);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al crear el rol: ' . $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $role = Role::with('permissions')->find($id);

            if (!$role) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'role' => $role
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
            $role = Role::find($id);

            if (!$role) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            $request->validate([
                'name' => ['required', 'string', Rule::unique('roles', 'name')->ignore($role->id)],
                'permissions' => ['array'],
                'permissions.*' => ['exists:permissions,name']
            ]);

            DB::beginTransaction();

            $role->update(['name' => $request->name]);

            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'message' => 'Rol actualizado exitosamente',
                'role' => $role->load('permissions')
            ], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al actualizar el rol: ' . $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $role = Role::find($id);

            if (!$role) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            $role->delete();
            return response()->json([
                'status' => MsgStatus::Success,
                'message' => 'Rol eliminado exitosamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error al eliminar el rol: ' . $th->getMessage()
            ], 500);
        }
    }
}
