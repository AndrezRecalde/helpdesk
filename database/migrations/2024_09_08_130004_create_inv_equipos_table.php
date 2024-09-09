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
        Schema::create('inv_equipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_equipo');
            $table->string('codigo_antiguo');
            $table->string('codigo_nuevo');
            $table->string('modelo')->nullable();
            $table->string('numero_serie');
            $table->date('fecha_adquisicion')->nullable();
            $table->date('fecha_amortizacion')->nullable();
            $table->integer('vida_util');
            $table->text('descripcion')->nullable();
            $table->boolean('bien_adquirido')->default(false);
            $table->boolean('bien_donado')->default(false);
            $table->boolean('bien_usado')->default(false);
            $table->unsignedInteger('ubicacion_id');
            $table->unsignedInteger('categoria_id');
            $table->unsignedInteger('estado_id');
            $table->unsignedInteger('marca_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_equipos');
    }
};
