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
        Schema::create('departamento_consumible', function (Blueprint $table) {
            $table->id();
            $table->integer('departamento_id'); // Relación con departamentos
            $table->unsignedBigInteger('consumible_id'); // Relación con inv_consumibles
            $table->integer('cantidad_solicitada'); // Cantidad solicitada
            $table->integer('usuario_autoriza'); // Usuario que autoriza
            $table->integer('usuario_solicita'); // Usuario que autoriza
            $table->timestamps();

            $table->foreign('departamento_id')->references('cdgo_dprtmnto')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('consumible_id')->references('id')->on('inv_consumibles')->onDelete('cascade');
            $table->foreign('usuario_autoriza')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('usuario_solicita')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');

            $table->index('departamento_id');
            $table->index('consumible_id');
            $table->index('usuario_autoriza');
            $table->index('usuario_solicita');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departamento_consumible');
    }
};
