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
        Schema::create('moradores', function (Blueprint $table) {
            $table->string('nome');
            $table->string('cpf')->unique()->primary();
            $table->string('sus')->unique()->nullable(); 
            $table->string('cep');
            $table->string('numero');
            $table->string('complemento')->nullable();
            $table->date('dataNasc');
            $table->string('nomeMae');
            $table->string('sexo');
            $table->string('estadoCivil');
            $table->string('escolaridade');
            $table->string('etnia');
            $table->boolean('planoSaude');
            $table->json('vacinasMorador')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moradores');
    }
};
