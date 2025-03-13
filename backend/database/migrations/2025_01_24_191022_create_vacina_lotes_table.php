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
        Schema::create('vacina_lotes', function (Blueprint $table) {
            $table->uuid('idVacina');
            $table->string('lote');
            $table->date('validade');
            $table->timestamps();   

            $table->primary(['idVacina', 'lote']);

            $table->foreign('idVacina')
                  ->references('id')
                  ->on('vacinas')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacina_lotes');
    }
};
