<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar caché de permisos antes de empezar
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ─────────────────────────────────────────────────
        // PERMISOS — Rol TIC
        // ─────────────────────────────────────────────────

        // Compartidos: Gerente + Técnico
        $ticCompartidos = [
            'tic.soportes.ver',           // Listar y buscar soportes actuales
            //'tic.soportes.crear',          // Crear nuevo soporte
            'tic.soportes.diagnosticar',   // Diagnosticar soporte
            'tic.soportes.reportes',       // Reportes de actividades y exportar PDF
            'tic.tecnicos.ver',            // Listar técnicos e info de soportes
            'tic.catalogos.ver',           // Ver catálogos del sistema (solo lectura) para formularios del sistema - como Areas TIC, tipo soporte, estados de soporte.
        ];

        // Exclusivos: Solo Gerente TIC
        $ticGerente = [
            // Usuarios
            'tic.usuarios.ver',                       // Listar usuarios y ver roles/permisos
            'tic.usuarios.gestionar',                 // Crear, editar, activar/desactivar usuarios
            'tic.usuarios.crear',
            'tic.usuarios.editar',
            'tic.roles.gestionar',                    // Asignar roles/permisos + CRUD roles y permisos

            // Estructura organizacional
            'tic.areas.gestionar',                    // CRUD áreas TIC + asignación de técnicos
            'tic.tecnicos.gestionar',                 // Editar técnicos, estadísticas, asignaciones
            'tic.departamentos.gestionar',             // Listar departamentos y actualizar directores

            // Soportes (administración)
            'tic.soportes.administrar',               // Asignar, anular, crear admin, actualizar soporte
            'tic.soportes.indicadores',               // Indicadores y exportar PDF de indicadores
            'tic.soportes.calificar',                 // Ver soportes sin calificar y registrar calificación

            // Dashboard
            'tic.dashboard.ver',                      // Dashboard y desempeño anual de técnicos

            // Inventario
            'tic.inventario.catalogos.gestionar',     // CRUD tipos categorías, categorías, estados, conceptos, marcas, ubicaciones
            'tic.inventario.equipos.gestionar',       // CRUD equipos, responsables, custodios, documentos, exportar, dar de baja
            'tic.inventario.consumibles.gestionar',   // CRUD consumibles e incrementar stock
            'tic.inventario.solicitudes.gestionar',   // Gestionar solicitudes de consumibles

            // Sistema
            'tic.app.configurar',                     // Actualizar imágenes de la aplicación
            'tic.telegram.notificar',                 // Notificar soporte asignado por Telegram
        ];

        // ─────────────────────────────────────────────────
        // PERMISOS — Rol TTHH
        // ─────────────────────────────────────────────────

        $tthhPermisos = [
            'tthh.asistencia.gestionar',   // Permisos laborales, estados, fechas de ingreso
            'tthh.vacaciones.gestionar',   // Solicitudes de vacaciones, periodos, descuentos
            'tthh.denuncias.gestionar',    // Administrar denuncias: responder, estado, archivos
        ];

        // Crear todos los permisos con guard 'web'
        $todosLosPermisos = array_merge($ticCompartidos, $ticGerente, $tthhPermisos);

        foreach ($todosLosPermisos as $permiso) {
            Permission::firstOrCreate(['name' => $permiso, 'guard_name' => 'web']);
        }

        // ─────────────────────────────────────────────────
        // ROLES Y ASIGNACIÓN DE PERMISOS
        // ─────────────────────────────────────────────────

        // Rol GERENTE — super-admin, NO necesita permisos asignados.
        // El Gate::before en AuthServiceProvider le da acceso a todo automáticamente.
        Role::firstOrCreate(['name' => 'GERENTE', 'guard_name' => 'web']);

        // Rol TIC — solo para técnicos, con los permisos operativos compartidos.
        $rolTic = Role::firstOrCreate(['name' => 'TIC', 'guard_name' => 'web']);
        $rolTic->syncPermissions($ticCompartidos);

        // Rol TTHH — se crea el rol; los permisos tthh.* existen pero se asignan manualmente.
        Role::firstOrCreate(['name' => 'TTHH', 'guard_name' => 'web']);

        $this->command->info('Roles y permisos creados correctamente.');
        $this->command->table(
            ['Rol', 'Permisos asignados'],
            [
                ['GERENTE', '(super-admin via Gate::before — no necesita permisos)'],
                ['TIC', implode(', ', $ticCompartidos)],
                ['TTHH', '(sin permisos por defecto — asignación manual)'],
            ]
        );
    }
}
