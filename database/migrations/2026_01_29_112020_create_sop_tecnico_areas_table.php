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
        Schema::create('sop_tecnico_areas', function (Blueprint $table) {
            $table->id();
            $table->integer('tecnico_id'); // cdgo_usrio del técnico
            $table->integer('area_tic_id'); // id_areas_tic
            $table->boolean('principal')->default(false); // Si es el área principal del técnico
            $table->boolean('activo')->default(true);
            $table->timestamps();

            // Foreign keys
            $table->foreign('tecnico_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('area_tic_id')->references('id_areas_tic')->on('sop_areas_tic')->onDelete('cascade');

            // Índices
            $table->index('tecnico_id');
            $table->index('area_tic_id');

            // Evitar duplicados: un técnico no puede estar dos veces en la misma área
            $table->unique(['tecnico_id', 'area_tic_id'], 'unique_tecnico_area');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sop_tecnico_areas');
    }
};
