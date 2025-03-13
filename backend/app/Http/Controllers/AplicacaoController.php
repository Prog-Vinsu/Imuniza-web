<?php

namespace App\Http\Controllers;

use App\Models\Aplicacao;
use App\Http\Requests\AplicacaoRequest;
use Illuminate\Http\Request;

class AplicacaoController extends Controller
{
    private $aplicacao;

    public function __construct(Aplicacao $aplicacao) 
    {
        $this->aplicacao = $aplicacao;
    }

    /**
     * Lista todas as aplicações, com filtros opcionais.
     */
    public function index(Request $request)
    {
        $aplicacoes = Aplicacao::query()
            ->with(['vacina', 'lote', 'morador'])
            ->when($request->vacinaLote, fn ($query) => $query->where('vacinaLote', 'like', "%{$request->vacinaLote}%"))
            ->when($request->cpfMorador, fn ($query) => $query->where('cpfMorador', 'like', "%{$request->cpfMorador}%"))
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        return response()->json($aplicacoes, 200);
    }

    /**
     * Cria uma nova aplicação.
     */
    public function store(AplicacaoRequest $request)
    {
        $data = $request->validated();
        $aplicacao = Aplicacao::create($data);

        return response()->json($aplicacao, 201);
    }

    /**
     * Exibe uma aplicação específica com base nas chaves compostas.
     */
    public function show(string $idVacina, string $vacinaLote, string $cpfMorador)
    {
        $aplicacao = Aplicacao::where('idVacina', $idVacina)
            ->where('vacinaLote', $vacinaLote)
            ->where('cpfMorador', $cpfMorador)
            ->firstOrFail();

        return response()->json($aplicacao, 200);
    }

    /**
     * Atualiza uma aplicação específica.
     */
    public function update(AplicacaoRequest $request, string $idVacina, string $vacinaLote, string $cpfMorador)
    {
        $data = $request->validated();
        $aplicacao = Aplicacao::where('idVacina', $idVacina)
            ->where('vacinaLote', $vacinaLote)
            ->where('cpfMorador', $cpfMorador)
            ->firstOrFail();
        
        $aplicacao->update($data);

        return response()->json($aplicacao, 200);
    }

    /**
     * Remove uma aplicação específica.
     */
    public function destroy(string $idVacina, string $vacinaLote, string $cpfMorador, int $doseAplicada)
    {
        $aplicacao = Aplicacao::where('idVacina', $idVacina)
            ->where('vacinaLote', $vacinaLote)
            ->where('cpfMorador', $cpfMorador)
            ->where('doseAplicada', $doseAplicada)
            ->firstOrFail();

        $aplicacao->delete();

        return response()->json(['message' => 'Aplicação excluída com sucesso!'], 204);
    }
}
