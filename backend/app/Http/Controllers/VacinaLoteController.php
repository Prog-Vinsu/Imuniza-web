<?php

namespace App\Http\Controllers;

use App\Models\VacinaLote;
use App\Http\Requests\VacinaLoteRequest;
use Illuminate\Http\Request;

class VacinaLoteController extends Controller
{
    private $vacina_lote;

    public function __construct(VacinaLote $vacina_lote) 
    {
        $this->vacina_lote = $vacina_lote;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vacina_lotes = VacinaLote::query()
        ->with('vacina')
        ->when($request->has('idVacina'), fn ($query) => $query->orWhere('idVacina', 'like', "%{$request['idVacina']}%"))
        ->when($request->has('lote'), fn ($query) => $query->orWhere('lote', 'like', "%{$request['lote']}%"))
        ->orderBy('created_at', 'desc')
        ->paginate((int) $request->per_page);

        return response()->json($vacina_lotes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VacinaLoteRequest $request)
    {
        $data = $request->validated();
        $vacina_lote = $this->vacina_lote->create($data);

        return response()->json($vacina_lote, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($idVacina, $lote)
    {
        $vacina_lote = VacinaLote::where('idVacina', $idVacina)
                                ->where('lote', $lote)
                                ->with('vacina')
                                ->firstOrFail();

        return response()->json($vacina_lote, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VacinaLoteRequest $request, $idVacina, $lote)
    {
        $data = $request->validated();
        $vacina_lote = VacinaLote::where('idVacina', $idVacina)
                                ->where('lote', $lote)
                                ->firstOrFail();
        $vacina_lote->update($data);

        return response()->json($vacina_lote, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idVacina, $lote)
    {
        $vacina_lote = VacinaLote::where('idVacina', $idVacina)
                                ->where('lote', $lote)
                                ->firstOrFail();
        $vacina_lote->delete();

        return response()->json(['message' => 'Lote excluído com sucesso!'], 204);
    }
}
