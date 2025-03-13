import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createAplicacao, deleteAplicacao, getAplicacoes, updateAplicacao } from "../services/aplicacoesService";
import { set } from "react-hook-form";
import { LoteVacina, Vacina } from "./VacinasContext";

export interface Aplicacao {
	cpfMorador: string;
	loteVacina: string;
	doseAplicada: number;
	created_at: string; // Adicione created_at
    updated_at: string; // Adicione updated_at

	lote: LoteVacina;          // Objeto completo do lote
 	vacina: Vacina;
}

export interface AplicacoesContextType {
	aplicacoes: Aplicacao[];
	adicionarAplicacao: (aplicacao: Aplicacao) => void;
	removerAplicacao: (
		idVacina: string,
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number,
	) => void;
	editarAplicacao: (cpfMorador: string, loteVacina: string, aplicacaoAtualizada: Aplicacao) => void;
}

const AplicacoesContext = createContext<AplicacoesContextType | undefined>(
	undefined
);

interface AplicacoesProviderProps {
	children: ReactNode;
}

export const AplicacoesProvider: React.FC<AplicacoesProviderProps> = ({
	children,
}) => {
	const [aplicacoes, setAplicacoes] = useState<Aplicacao[]>([]);

	useEffect(() => {
		(async () => {
				try {
					const aplicacoesData = await getAplicacoes();
					setAplicacoes(aplicacoesData)
				}
				catch (error) {
					console.error("Erro ao buscar aplicações: ", error)
				}
			})()
		}, [])

	const adicionarAplicacao = async (aplicacao: Aplicacao) => {
		// setAplicacoes((prev) => [...prev, aplicacao]);
		
		try {
			const criado = await createAplicacao(aplicacao);
			setAplicacoes((prev) => [...prev, criado]);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao criar aplicação: ", error)
		}
	};

	const removerAplicacao = async (
		idVacina: string,
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number
	) => {
		// setAplicacoes((prev) =>
		// 	prev.filter(
		// 		(aplicacao) =>
		// 			!(
		// 				aplicacao.cpfMorador === cpfMorador &&
		// 				aplicacao.loteVacina === loteVacina &&
		// 				aplicacao.doseAplicada === doseAplicada
		// 			)
		// 	)
		// );

		try {
			await deleteAplicacao(idVacina, cpfMorador, loteVacina, doseAplicada);
			setAplicacoes((prev) =>
				prev.filter(
					(aplicacao) =>
						!(
							aplicacao.cpfMorador === cpfMorador &&
							aplicacao.loteVacina === loteVacina &&
							aplicacao.vacina.id === idVacina &&
							aplicacao.doseAplicada === doseAplicada
						)
				)
			);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao remover aplicação: ", error)
		}
	};

	const editarAplicacao = async (cpfMorador: string, loteVacina: string, aplicacaoAtualizada: Aplicacao) => {
		// setAplicacoes((prev) =>
		// 	prev.map((ap) =>
		// 		ap.cpfMorador === aplicacao.cpfMorador &&
		// 		ap.loteVacina === aplicacao.loteVacina &&
		// 		ap.doseAplicada === aplicacao.doseAplicada
		// 			? aplicacao
		// 			: ap
		// 	)
		// );

		try {
			const atualizado = await updateAplicacao(
				cpfMorador,
				loteVacina,
				aplicacaoAtualizada
			);
			setAplicacoes((prev) =>
				prev.map((aplicacao) =>
					aplicacao.cpfMorador === cpfMorador &&
					aplicacao.loteVacina === loteVacina
						? atualizado
						: aplicacao
				)
			);
			window.location.reload()
		} catch (error) {
			console.error("Erro ao atualizar aplicação: ", error)
		}
	};

	return (
		<AplicacoesContext.Provider
			value={{
				aplicacoes,
				adicionarAplicacao,
				removerAplicacao,
				editarAplicacao,
			}}
		>
			{children}
		</AplicacoesContext.Provider>
	);
};

export const useAplicacoes = (): AplicacoesContextType => {
	const context = useContext(AplicacoesContext);
	if (!context) {
		throw new Error(
			"useAplicacoes deve ser usado dentro de um AplicacoesProvider"
		);
	}
	return context;
};
