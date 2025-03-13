import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createFabricante, deleteFabricante, getFabricantes, updateFabricante } from "../services/fabricanteService";
import { createVacina, deleteVacina, getVacinas, updateVacina } from "../services/vacinasService";
import { createVacinaLote, deleteVacinaLote, getVacinaLotes, updateVacinaLote } from "../services/vacinaLoteService";
import { set } from "react-hook-form";

export interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento?: string;
}

export interface Vacina {
	id: string;
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	dosesNecessarias: number;
	intervalo?: number;
	indicacao: string[];
}

export interface LoteVacina {
	vacina: string;
	lote: string;
	validade: string;
}

export interface VacinasContextType {
	fabricantes: Fabricante[];
	vacinas: Vacina[];
	lotes: LoteVacina[];
	adicionarFabricante: (fabricante: Fabricante) => void;
	adicionarVacina: (vacina: Vacina) => void;
	adicionarLote: (lote: LoteVacina) => void;
	removerFabricante: (cnpj: string) => void;
	removerVacina: (nome: string) => void;
	removerLote: (idVacinaLote: string, lote: string) => void;
	editarFabricante: (cnpjFabricante: string, fabricante: Fabricante) => void;
	editarVacina: (idVacina: string, novosDadosVacina: Vacina) => void;
	editarLote: (idVacinaLote: string, lote: string, loteAtualizado: LoteVacina) => void;
}

const VacinasContext = createContext<VacinasContextType | undefined>(undefined);

interface VacinasProviderProps {
	children: ReactNode;
}

export const VacinasProvider: React.FC<VacinasProviderProps> = ({
	children,
}) => {
	const [fabricantes, setFabricantes] = useState<Fabricante[]>([]);
	const [vacinas, setVacinas] = useState<Vacina[]>([]);
	const [lotes, setLotes] = useState<LoteVacina[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const fabricantesData = await getFabricantes();
				setFabricantes(fabricantesData)
			}
			catch (error) {
				console.error("Erro ao buscar fabricantes: ", error)
			}
		})()
	}, [])
	
	useEffect(() => {
		(async () => {
			try {
				const vacinasData = await getVacinas();
				setVacinas(vacinasData)
			}
			catch (error) {
				console.error("Erro ao buscar vacinas: ", error)
			}
		})()
	}, [])

	useEffect(() => {
		(async () => {
			try {
				const lotesData = await getVacinaLotes();
				setLotes(lotesData)
			}
			catch (error) {
				console.error("Erro ao buscar lotes de vacina: ", error)
			}
		})()
	}, [])

	const adicionarFabricante = async (fabricante: Fabricante) => {
		// setFabricantes((prev) => [...prev, fabricante]);

		try {
			const criado = await createFabricante(fabricante);
			setFabricantes((prevFabricantes) => [...prevFabricantes, criado]);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao criar fabricante: ", error)
		}
	};

	const adicionarVacina = async (vacina: Vacina) => {
		// setVacinas((prev) => [...prev, vacina]);

		try {
			const criado = await createVacina(vacina);
			setVacinas((prevVacinas) => [...prevVacinas, criado]);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao criar vacina: ", error)
		}
	};

	const adicionarLote = async (lote: LoteVacina) => {
		// setLotes((prev) => [...prev, lote]);

		try {
			const criado = await createVacinaLote(lote);
			setLotes((prevLotes) => [...prevLotes, criado]);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao criar lote: ", error)
		}
	};

	const removerFabricante = async (cnpj: string) => {
		// setFabricantes((prev) => prev.filter((fab) => fab.cnpj !== cnpj));

		try {
			await deleteFabricante(cnpj)
			setFabricantes((prevFabricantes) => 
				prevFabricantes.filter((fabricante) => fabricante.cnpj !== cnpj)
			)
			window.location.reload()
		}
		catch (error) {
			console.error(" Erro ao deletar fabricante: ", error)
		}
	};

	const removerVacina = async (id: string) => {
		// setVacinas((prev) => prev.filter((vac) => vac.nome !== nome));

		try {
			await deleteVacina(id)
			setVacinas((prevVacinas) =>
				prevVacinas.filter((vacina) => vacina.id !== id)
			)
			window.location.reload()
		} catch (error) {
			console.error("Erro ao deletar vacina: ", error)
		}
	};

	const removerLote = async (idVacinaLote: string, lote: string) => {
		// setLotes((prev) => prev.filter((l) => l.lote !== lote));

		try {
			await deleteVacinaLote(idVacinaLote, lote)
			setLotes((prevLotes) =>
				prevLotes.filter(
				  (loteVacina) => !(loteVacina.lote === lote && loteVacina.vacina === idVacinaLote)
				)
			  );
			  window.location.reload()
		} catch (error) {
			console.error("Erro ao deletar lote: ", error)
		}
	};

	const editarFabricante = async (oldCnpj: string, novosDadosFabricante: Fabricante) => {
		// setFabricantes((prev) =>
		// 	prev.map((fab) => (fab.cnpj === fabricante.cnpj ? fabricante : fab))
		// );

		try {
			const atualizado = await updateFabricante(oldCnpj, novosDadosFabricante);
			setFabricantes((prevFabricantes) =>
			  prevFabricantes.map((f) =>
				f.cnpj.replace(/\D/g, "").trim() === oldCnpj.replace(/\D/g, "").trim() ? atualizado : f
			  )
			);
			window.location.reload()
		  } catch (error) {
			console.error("Erro ao atualizar fabricante: ", error);
		  }
	};

	const editarVacina = async (idVacina: string, novosDadosVacina: Vacina) => {
		// setVacinas((prev) =>
		// 	prev.map((vac) => (vac.nome === vacina.nome ? vacina : vac))
		// );

		try {
			const atualizado = await updateVacina(idVacina, novosDadosVacina);
			setVacinas((prevVacinas) =>
				prevVacinas.map((vacina) =>
					vacina.id === idVacina ? atualizado : vacina
				)
			);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao atualizar vacina: ", error);
		}
	};

	const editarLote = async (idVacina: string, lote: string, loteAtualizado: LoteVacina) => {
		// setLotes((prevLotes) =>
		// 	prevLotes.map((lote) =>
		// 		lote.lote === loteAtualizado.lote ? loteAtualizado : lote
		// 	)
		// );

		try {
			const atualizado = await updateVacinaLote(idVacina, lote, loteAtualizado);
			setLotes((prevLotes) =>
				prevLotes.map((loteVacina) =>
					(loteVacina.lote === lote && loteVacina.vacina === idVacina) ? atualizado : loteVacina
				)
			);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao atualizar lote: ", error);
		}
	};

	return (
		<VacinasContext.Provider
			value={{	
				fabricantes,
				vacinas,
				lotes,
				adicionarFabricante,
				adicionarVacina,
				adicionarLote,
				removerFabricante,
				removerVacina,
				removerLote,
				editarFabricante,
				editarVacina,
				editarLote,
			}}
		>
			{children}
		</VacinasContext.Provider>
	);
};

export const useVacinas = (): VacinasContextType => {
	const context = useContext(VacinasContext);
	if (!context) {
		throw new Error("useVacinas deve ser usado dentro de um VacinasProvider");
	}
	return context;
};
