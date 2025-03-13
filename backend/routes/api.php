<?php

use App\Http\Controllers\AplicacaoController;
use App\Http\Controllers\FabricanteController;
use App\Http\Controllers\MoradorController;
use App\Http\Controllers\VacinaController;
use App\Http\Controllers\VacinaLoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::apiResource('/moradores', MoradorController::class);
Route::apiResource('/fabricantes',FabricanteController::class)->except(['show']);
Route::apiResource('/vacinas',VacinaController::class);
//Route::apiResource('/vacina-lotes',VacinaLoteController::class);
Route::apiResource('/aplicacoes', AplicacaoController::class)->except(['show', 'update', 'destroy']);

Route::get('/fabricantes/{cnpj}', [FabricanteController::class, 'show']);

Route::get('/vacina-lotes', [VacinaLoteController::class, 'index']);
Route::post('/vacina-lotes', [VacinaLoteController::class, 'store']);
Route::get('/vacina-lotes/{idVacina}/{lote}', [VacinaLoteController::class, 'show']);
Route::put('/vacina-lotes/{idVacina}/{lote}', [VacinaLoteController::class, 'update']);
Route::delete('/vacina-lotes/{idVacina}/{lote}', [VacinaLoteController::class, 'destroy']);

Route::get('/aplicacoes/{idVacina}/{vacinaLote}/{cpfMorador}', [AplicacaoController::class, 'show']);
Route::put('/aplicacoes/{idVacina}/{vacinaLote}/{cpfMorador}', [AplicacaoController::class, 'update']);
Route::delete('/aplicacoes/{idVacina}/{vacinaLote}/{cpfMorador}/{doseAplicada}', [AplicacaoController::class, 'destroy']);


// Route::get('/moradores', [MoradorController::class, 'index']);
// Route::get('/moradores/{id}', [MoradorController::class, 'show']);
// Route::get('/fabricantes', [MoradorController::class, 'index']);
// Route::get('/fabricantes/{id}', [MoradorController::class, 'show']);
// Route::get('/vacinas', [MoradorController::class, 'index']);
// Route::get('/vacinas/{id}', [MoradorController::class, 'show']);
// Route::get('/vacina-lotes', [MoradorController::class, 'index']);
// Route::get('/vacina-lotes/{id}', [MoradorController::class, 'show']);
// Route::get('/aplicacoes', [MoradorController::class, 'index']);
// Route::get('/aplicacoes/{id}', [MoradorController::class, 'show']);