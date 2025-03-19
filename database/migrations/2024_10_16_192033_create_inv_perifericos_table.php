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
        Schema::create('inv_perifericos', function (Blueprint $table) {
            $table->id();
            //$table->string('nombre_periferico'); // Puede ser 'mouse', 'teclado', 'auriculares', etc.
            $table->string('nombre_periferico');
            $table->unsignedInteger('marca_id');
            $table->unsignedInteger('categoria_id');
            $table->string('numero_serie')->nullable();
            $table->date('fecha_adquisicion')->nullable();
            $table->date('fecha_baja')->nullable();
            $table->boolean('es_adquirido')->default(false);
            $table->boolean('es_donado')->default(false);
            $table->boolean('es_usado')->default(false);
            $table->unsignedInteger('estado_id'); // Relación con inv_equipos
            $table->unsignedInteger('equipo_id')->nullable(); // Relación con inv_equipos
            $table->unsignedBigInteger('user_id')->nullable(); //Se agrega usuario custodio

            //$table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('set null');
            $table->timestamps();

            $table->foreign('marca_id')->references('id')->on('inv_marcas')->onDelete('cascade');
            $table->foreign('categoria_id')->references('id')->on('inv_categorias')->onDelete('cascade');
            $table->foreign('estado_id')->references('id')->on('inv_estados')->onDelete('cascade');
            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');
            $table->foreign('user_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');

            $table->index('marca_id');
            $table->index('categoria_id');
            $table->index('estado_id');
            $table->index('equipo_id');
            $table->index('user_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_perifericos');
    }
};
