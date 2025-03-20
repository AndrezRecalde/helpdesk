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
        Schema::create('inv_consumibles', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_consumible');
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedInteger('stock')->default(0);
            $table->boolean('activo')->default(false);
            $table->timestamps();

            $table->foreign('categoria_id')->references('id')->on('inv_categorias')->onDelete('cascade');

            $table->index('categoria_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_consumibles');
    }
};
