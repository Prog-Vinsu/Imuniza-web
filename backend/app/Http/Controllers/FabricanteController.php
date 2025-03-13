<?php

namespace App\Http\Controllers;

use App\Models\Fabricante;
use App\Http\Requests\FabricanteRequest;
use Illuminate\Http\Request;

class FabricanteController extends Controller
{
    private $fabricante;

    public function __construct(Fabricante $fabricante) {
        $this->fabricante = $fabricante;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $fabricante = Fabricante::query()
        ->when($request->has('cnpj'), fn ($query) => $query->orWhere('cnpj', 'like', "%{$request['cnpj']}%"))
        ->when($request->has('nome'), fn ($query) => $query->orWhere('nome', 'like', "%{$request['nome']}%"))
        ->orderBy('created_at', 'desc')
        ->paginate((int) $request->per_page);

        return response()->json($fabricante, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FabricanteRequest $request)
    {
        $data = $request->validated();
        $fabricante = $this->fabricante->create($data);

        return response()->json($fabricante, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $cnpj)
    {
        dd($cnpj);
        $fabricante = $this->fabricante->findOrFail($cnpj);

        return response()->json($fabricante, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FabricanteRequest $request, string $cnpj)
    {
        $data = $request->validated();
        $fabricante = $this->fabricante->findOrFail($cnpj);
        $fabricante->update($data);

        return response()->json($fabricante, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $cnpj)
    {
        $fabricante = Fabricante::where('cnpj', $cnpj)->firstOrFail();
        $fabricante->delete();
        return response()->json(['message' => 'Fabricante excluído com sucesso!'], 204);
    }
}
