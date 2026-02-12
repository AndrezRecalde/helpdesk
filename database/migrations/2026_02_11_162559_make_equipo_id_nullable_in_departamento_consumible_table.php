<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Hacer nullable las columnas equipo_id y director_area
            $table->unsignedBigInteger('equipo_id')->nullable()->change();
            $table->unsignedInteger('director_area')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('departamento_consumible', function (Blueprint $table) {
            // Revertir los cambios
            $table->unsignedBigInteger('equipo_id')->nullable(false)->change();
            $table->unsignedInteger('director_area')->nullable(false)->change();
        });
    }
};
