<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Paso 1: Agregar solicitud_id como nullable temporalmente
            $table->unsignedBigInteger('solicitud_id')->nullable()->after('id');
        });

        // Paso 2: Migrar datos existentes
        $this->migrateExistingData();

        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Paso 3: Hacer solicitud_id NOT NULL
            $table->unsignedBigInteger('solicitud_id')->nullable(false)->change();

            // Paso 4: Eliminar foreign keys
            $table->dropForeign(['departamento_id']);
            $table->dropForeign(['usuario_autoriza']);
            $table->dropForeign(['usuario_solicita']);

            // Paso 5: Eliminar columnas redundantes
            $table->dropColumn(['departamento_id', 'usuario_autoriza', 'usuario_solicita']);

            // Paso 6: Agregar foreign key a solicitud
            $table->foreign('solicitud_id')->references('id')->on('solicitudes_consumibles')->onDelete('cascade');
            $table->index('solicitud_id');
        });
    }

    /**
     * Migrar datos existentes agrupando por departamento, usuario_autoriza, usuario_solicita y fecha
     */
    private function migrateExistingData(): void
    {
        // Obtener registros agrupados
        $grupos = DB::table('departamento_consumible')
            ->select('departamento_id', 'usuario_autoriza', 'usuario_solicita', DB::raw('DATE(created_at) as fecha'))
            ->groupBy('departamento_id', 'usuario_autoriza', 'usuario_solicita', DB::raw('DATE(created_at)'))
            ->get();

        foreach ($grupos as $grupo) {
            // Generar número de solicitud
            $year = date('Y', strtotime($grupo->fecha));
            $lastSolicitud = DB::table('solicitudes_consumibles')
                ->whereYear('created_at', $year)
                ->orderBy('id', 'desc')
                ->first();

            $consecutivo = $lastSolicitud ? (int) substr($lastSolicitud->numero_solicitud, -4) + 1 : 1;
            $numeroSolicitud = sprintf('SOL-%s-%04d', $year, $consecutivo);

            // Crear solicitud
            $solicitudId = DB::table('solicitudes_consumibles')->insertGetId([
                'numero_solicitud' => $numeroSolicitud,
                'departamento_id' => $grupo->departamento_id,
                'usuario_autoriza' => $grupo->usuario_autoriza,
                'usuario_solicita' => $grupo->usuario_solicita,
                'observaciones' => 'Migración automática de datos existentes',
                'created_at' => $grupo->fecha,
                'updated_at' => $grupo->fecha
            ]);

            // Actualizar registros de departamento_consumible
            DB::table('departamento_consumible')
                ->where('departamento_id', $grupo->departamento_id)
                ->where('usuario_autoriza', $grupo->usuario_autoriza)
                ->where('usuario_solicita', $grupo->usuario_solicita)
                ->whereDate('created_at', $grupo->fecha)
                ->update(['solicitud_id' => $solicitudId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Revertir cambios
            $table->dropForeign(['solicitud_id']);
            $table->dropColumn('solicitud_id');

            // Restaurar columnas
            $table->integer('departamento_id')->after('id');
            $table->integer('usuario_autoriza');
            $table->integer('usuario_solicita');

            // Restaurar foreign keys
            $table->foreign('departamento_id')->references('cdgo_dprtmnto')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('usuario_autoriza')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('usuario_solicita')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
        });
    }
};
