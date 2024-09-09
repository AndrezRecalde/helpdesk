<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('departamento_equipo', function (Blueprint $table) {
            $table->unsignedBigInteger('departamento_id');
            $table->unsignedBigInteger('equipo_id');

            $table->primary(['departamento_id', 'equipo_id']);

            // Definir relaciones foráneas
            $table->foreign('departamento_id')->references('id')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departamento_equipo');
    }
};
