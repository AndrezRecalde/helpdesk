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
        Schema::create('usuario_equipo', function (Blueprint $table) {
            $table->id();
            $table->integer('usuario_id');
            $table->unsignedBigInteger('equipo_id');
            $table->unsignedBigInteger('concepto_id');
            $table->integer('direccion_id');

            //$table->primary(['usuario_id', 'direccion_id', 'equipo_id', 'concepto_id']);

            // Definir relaciones foráneas
            $table->foreign('usuario_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('direccion_id')->references('cdgo_dprtmnto')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');
            $table->foreign('concepto_id')->references('id')->on('inv_conceptos')->onDelete('cascade');

            $table->index('usuario_id');
            $table->index('direccion_id');
            $table->index('equipo_id');
            $table->index('concepto_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_equipo');
    }
};
