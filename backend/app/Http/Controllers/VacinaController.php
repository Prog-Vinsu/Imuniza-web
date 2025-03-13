<?php

namespace App\Http\Controllers;

use App\Models\Vacina;
use App\Http\Requests\VacinaRequest;
use Illuminate\Http\Request;

class VacinaController extends Controller
{
    private $vacina;

    public function __construct(Vacina $vacina) 
    {
        $this->vacina = $vacina;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vacinas = Vacina::query()
        ->with('fabricante')
        ->when($request->has('nome'), fn ($query) => $query->orWhere('nome', 'like', "%{$request['nome']}%"))
        ->when($request->has('cnpjFabricante'), fn ($query) => $query->orWhere('cnpjFabricante', 'like', "%{$request['cnpjFabricante']}%"))
        ->when($request->has('tipo'), fn ($query) => $query->orWhere('tipo', 'like', "%{$request['tipo']}%"))
        ->orderBy('created_at', 'desc')
        ->paginate((int) $request->per_page);

        return response()->json($vacinas, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VacinaRequest $request)
    {
        $data = $request->validated();
        $vacina = $this->vacina->create($data);

        return response()->json($vacina, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vacina = $this->vacina->with('fabricante')->findOrFail($id);

        return response()->json($vacina, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VacinaRequest $request, string $id)
    {
        $data = $request->validated();
        $vacina = $this->vacina->findOrFail($id);
        $vacina->update($data);

        return response()->json($vacina, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vacina = $this->vacina->findOrFail($id);
        $vacina->delete();

        return response()->json(['message' => 'Vacina excluida com sucesso!'], 204);
    }
}
