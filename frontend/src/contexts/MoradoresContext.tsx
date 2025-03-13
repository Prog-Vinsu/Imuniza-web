import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { createMorador, deleteMorador, getMoradores, updateMorador } from "../services/moradorService";
import { data } from "react-router-dom";

export interface Morador {
	nome: string;
	cpf: string;
	sus: string;
	cep: string;
	numero: string;
	complemento: string;
	dataNasc: Date;
	nomeMae: string;
	sexo: string;
	estadoCivil: string;
	escolaridade: string;
	etnia: string;
	planoSaude: boolean;
	vacinasMorador: string[];
}

interface MoradoresContextType {
	moradores: Morador[];
	adicionarMorador: (novoMorador: Morador) => void;
	editarMorador: (cpfMorador: string, novosDadosMorador: Morador) => void;
	deletarMorador: (cpfMorador: string) => void;
}

const MoradoresContext = createContext<MoradoresContextType | undefined>(
	undefined
);

// Provider do contexto
export const MoradoresProvider = ({ children }: { children: ReactNode }) => {
	const [moradores, setMoradores] = useState<Morador[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await getMoradores();
				setMoradores(data)
			}
			catch (error) {
				console.error("Erro ao buscar moradores: ", error)
			}
		})()
	}, [])

	const adicionarMorador = async (novoMorador: Morador) => {
		// setMoradores((prevMoradores) => [...prevMoradores, novoMorador]);
		
		try {
			const criado = await createMorador(novoMorador);
			setMoradores((prevMoradores) => [...prevMoradores, criado]);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao criar morador: ", error)
		}
	};

	const editarMorador = async (cpfMorador: string, novosDadosMorador: Morador) => {
		// setMoradores((prevMoradores) =>
		// 	prevMoradores.map((morador) =>
		// 		morador.cpf === cpfMorador
		// 			? { ...morador, ...novosDadosMorador }
		// 			: morador
		// 	)
		// );

		try {
			const atualizado = await updateMorador(cpfMorador, novosDadosMorador);
			setMoradores((prevMoradores) => {
				if (!prevMoradores) {
					console.error("Moradores não encontrados");
					return [];
				}
			
				return prevMoradores.map((morador) =>
					morador.cpf === cpfMorador ? { ...morador, ...atualizado } : morador
				);
			});
			window.location.reload()
		} catch (error) {
			console.error("Erro ao atualizar morador: ", error)
		}
	};

	const deletarMorador = async (cpfMorador: string) => {
		// setMoradores((prevMoradores) =>
		// 	prevMoradores.filter((morador) => morador.cpf !== cpfMorador)
		// );

		try {
			await deleteMorador(cpfMorador);
			setMoradores((prevMoradores) =>
				prevMoradores.filter((morador) => morador.cpf !== cpfMorador)
			);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao deletar morador: ", error)
		}
	};

	// Salvar os dados no localStorage

	// useEffect(() => {
	// 	localStorage.setItem("moradores", JSON.stringify(moradores));
	// }, [moradores]);

	return (
		<MoradoresContext.Provider
			value={{ moradores, adicionarMorador, editarMorador, deletarMorador }}
		>
			{children}
		</MoradoresContext.Provider>
	);
};

// Hook para acessar o contexto
export const useMoradores = () => {
	const context = useContext(MoradoresContext);
	if (!context) {
		throw new Error("useContext deve ser usado dentro de um MoradoresProvider");
	}
	return context;
};

export default MoradoresContext;
