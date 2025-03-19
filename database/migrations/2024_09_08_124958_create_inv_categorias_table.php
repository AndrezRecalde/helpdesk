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
        Schema::create('inv_categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_categoria');
            $table->unsignedBigInteger('tipocategoria_id');
            //$table->integer('stock')->default(0);
            $table->boolean('activo');
            $table->timestamps();

            $table->foreign('tipocategoria_id')->references('id')->on('inv_tipocategorias')->onDelete('cascade');


            $table->index('tipocategoria_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_categorias');
    }
};
