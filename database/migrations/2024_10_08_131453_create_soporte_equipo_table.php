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
        Schema::create('soporte_equipo', function (Blueprint $table) {
            $table->integer('soporte_id');
            $table->unsignedBigInteger('equipo_id');

            $table->primary(['soporte_id', 'equipo_id']);

            // Definir relaciones foráneas
            $table->foreign('soporte_id')->references('id_sop')->on('sop_soporte')->onDelete('cascade');
            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');

            $table->index('soporte_id');
            $table->index('equipo_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soporte_equipo');
    }
};
