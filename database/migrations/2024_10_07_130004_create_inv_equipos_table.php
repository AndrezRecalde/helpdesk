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
            $table->unsignedBigInteger('ubicacion_id');
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedBigInteger('estado_id');
            $table->unsignedBigInteger('marca_id');
            $table->timestamps();


            $table->foreign('ubicacion_id')->references('id')->on('inv_ubicaciones')->onDelete('cascade');
            $table->foreign('categoria_id')->references('id')->on('inv_categorias')->onDelete('cascade');
            $table->foreign('estado_id')->references('id')->on('inv_estados')->onDelete('cascade');
            $table->foreign('marca_id')->references('id')->on('inv_marcas')->onDelete('cascade');

            $table->index('ubicacion_id');
            $table->index('categoria_id');
            $table->index('estado_id');
            $table->index('marca_id');


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
