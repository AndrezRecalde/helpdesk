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
        Schema::create('sop_licencias_equipos', function (Blueprint $table) {
            $table->id();
            $table->integer('id_soporte');

            $table->unsignedBigInteger('id_equipo');
            $table->foreign('id_equipo')->references('id')->on('inv_equipos')->onDelete('cascade');

            $table->unsignedBigInteger('id_licencia');
            $table->foreign('id_licencia')->references('id_licencia')->on('sop_licencias')->onDelete('cascade');

            $table->date('fecha_instalacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sop_licencias_equipos');
    }
};
