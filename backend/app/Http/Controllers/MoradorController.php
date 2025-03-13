<?php

namespace App\Http\Controllers;

use App\Models\Morador;
use App\Http\Requests\MoradorRequest;
use Illuminate\Http\Request;

class MoradorController extends Controller
{
    private $morador;

    public function __construct(Morador $morador) 
    {
        $this->morador = $morador;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $contacts = Morador::query()
            ->when($request->has('nome'), fn ($query) => $query->orWhere('nome', 'like', "%{$request['nome']}%"))
            ->when($request->has('sus'), fn ($query) => $query->orWhere('sus', 'like', "%{$request['sus']}%"))
            ->when($request->has('cpf'), fn ($query) => $query->orWhere('cpf', 'like', "%{$request['cpf']}%"))
            ->with('aplicacoes.vacina') 
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        $contacts->getCollection()->transform(function ($morador) {
            return [
                'nome' => $morador->nome,
                'cpf' => $morador->cpf,
                'sus' => $morador->sus,
                'cep' => $morador->cep,
                'numero' => $morador->numero,
                'complemento' => $morador->complemento,
                'dataNasc' => $morador->dataNasc,
                'nomeMae' => $morador->nomeMae,
                'sexo' => $morador->sexo,
                'estadoCivil' => $morador->estadoCivil,
                'escolaridade' => $morador->escolaridade,
                'etnia' => $morador->etnia,
                'planoSaude' => $morador->planoSaude,
                'vacinasMorador' => $morador->vacinasMorador,
                'created_at' => $morador->created_at,
                'updated_at' => $morador->updated_at,
            ];
        });

        return response()->json($contacts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MoradorRequest $request)
    {
        $data = $request->validated();
        $morador = $this->morador->create($data);

        return response()->json($morador, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $cpf)
    {
        $morador = $this->morador->with('aplicacoes.vacina')->findOrFail($cpf);
        

        return response()->json([
            'nome' => $morador->nome,
            'cpf' => $morador->cpf,
            'sus' => $morador->sus,
            'cep' => $morador->cep,
            'numero' => $morador->numero,
            'complemento' => $morador->complemento,
            'dataNasc' => $morador->dataNasc,
            'nomeMae' => $morador->nomeMae,
            'sexo' => $morador->sexo,
            'estadoCivil' => $morador->estadoCivil,
            'escolaridade' => $morador->escolaridade,
            'etnia' => $morador->etnia,
            'planoSaude' => $morador->planoSaude,
            'vacinasMorador' => $morador->vacinasMorador,
            'created_at' => $morador->created_at,
            'updated_at' => $morador->updated_at,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MoradorRequest $request, string $cpf)
    {
        $data = $request->validated();
        $morador = $this->morador->findOrFail($cpf);
        $morador->update($data);

        return response()->json($morador, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $cpf)
    {
        $morador = $this->morador->findOrFail($cpf);
        $morador->delete();

        return response()->json(['message' => 'Morador excluido com sucesso!'], 204);
    }
}
