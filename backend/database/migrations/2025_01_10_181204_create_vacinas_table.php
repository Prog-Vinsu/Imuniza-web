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
        Schema::create('vacinas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome'); 
            $table->string('cnpjFabricante'); 
            $table->string('tipo');
            $table->integer('dosesNecessarias');
            $table->integer('intervaloDoses')->nullable();
            $table->json('indicacao');
            $table->timestamps();
            
            $table->foreign('cnpjFabricante') 
                  ->references('cnpj')
                  ->on('fabricantes')
                  ->onDelete('cascade') 
                  ->onUpdate('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacinas');
    }
};
