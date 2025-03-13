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
        Schema::create('aplicacoes', function (Blueprint $table) {
            $table->string('idVacina'); 
            $table->string('vacinaLote');   
            $table->string('cpfMorador');
            $table->integer('doseAplicada');
            $table->timestamps();
        
            $table->primary(['idVacina', 'vacinaLote', 'cpfMorador', 'doseAplicada']);
        
            $table->foreign(['idVacina', 'vacinaLote'])
                  ->references(['idVacina', 'lote'])
                  ->on('vacina_lotes')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        
            $table->foreign('cpfMorador')
                  ->references('cpf')
                  ->on('moradores')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**,0
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aplicacoes');
    }
};
