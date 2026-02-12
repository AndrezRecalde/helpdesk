<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Agregar director_tic (nullable para datos existentes)
            $table->unsignedInteger('director_tic')->nullable()->after('director_area');

            // Agregar fecha_solicitud (nullable para datos existentes)
            $table->date('fecha_solicitud')->nullable()->after('director_tic');

            // Agregar foreign key para director_tic
            $table->foreign('director_tic')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            $table->dropForeign(['director_tic']);
            $table->dropColumn(['director_tic', 'fecha_solicitud']);
        });
    }
};
