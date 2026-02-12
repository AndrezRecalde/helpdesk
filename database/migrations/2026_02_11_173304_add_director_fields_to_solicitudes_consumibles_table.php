<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('solicitudes_consumibles', function (Blueprint $table) {
            // Agregar director_area
            $table->unsignedInteger('director_area')->after('usuario_autoriza');

            // Agregar director_tic
            $table->unsignedInteger('director_tic')->after('director_area');

            // Agregar fecha_solicitud
            $table->date('fecha_solicitud')->after('director_tic');

            // Agregar foreign keys
            $table->foreign('director_area')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('director_tic')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
        });

        // Remover campos de departamento_consumible
        Schema::table('departamento_consumible', function (Blueprint $table) {
            $table->dropForeign(['director_tic']);
            $table->dropColumn(['director_area', 'director_tic', 'fecha']);
        });
    }

    public function down(): void
    {
        // Restaurar campos en departamento_consumible
        Schema::table('departamento_consumible', function (Blueprint $table) {
            $table->unsignedInteger('director_area')->nullable()->after('equipo_id');
            $table->unsignedInteger('director_tic')->nullable()->after('director_area');
            $table->date('fecha')->nullable()->after('director_tic');
            $table->foreign('director_tic')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
        });

        // Remover campos de solicitudes_consumibles
        Schema::table('solicitudes_consumibles', function (Blueprint $table) {
            $table->dropForeign(['director_area']);
            $table->dropForeign(['director_tic']);
            $table->dropColumn(['director_area', 'director_tic', 'fecha_solicitud']);
        });
    }
};
