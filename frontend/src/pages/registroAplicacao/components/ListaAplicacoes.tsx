import { Trash2 } from "react-feather";
import { useAplicacoes } from "../../../contexts/AplicacoesContext";
import { useMoradores } from "../../../contexts/MoradoresContext";
import { useVacinas, Vacina } from "../../../contexts/VacinasContext";

export default function ListaAplicacoes() {
	const { aplicacoes, removerAplicacao } = useAplicacoes();
	const { moradores, editarMorador } = useMoradores();
	const { lotes, vacinas } = useVacinas();

	const getMoradorNome = (cpf: string) => {
		const morador = moradores.find((morador) => morador?.cpf === cpf);
		return morador ? morador.nome : "Desconhecido";
	};

	const getVacinaNome = (lote: string) => {
		const loteVacina = lotes.find((l) => l.lote === lote);

		if (!loteVacina) {
			console.error(`Lote ${lote} não encontrado`);
			return "Desconhecida";
		}

		const vacinaId = typeof loteVacina.vacina === "object" 
			? (loteVacina.vacina as Vacina).id 
			: loteVacina.vacina;


		const vacina = vacinas.find((v) => v.id === vacinaId);  

		if (!vacina) {
			console.error(`Vacina para o lote ${lote} não encontrada`);
			return "Desconhecida";
		}

		return vacina.nome;  
	};

	const handleDeleteAplicacao = (
		idVacina: string,
		cpfMorador: string,
		loteVacina: string,
		doseAplicada: number
	) => {
		if (window.confirm("Tem certeza que deseja excluir esta aplicação?")) {
			removerAplicacao(idVacina, cpfMorador, loteVacina, doseAplicada);

			const morador = moradores.find((m) => m.cpf === cpfMorador);
			if (morador) {
				const vacinaAplicada = `${getVacinaNome(
					loteVacina
				)} - Lote: ${loteVacina} - Dose: ${doseAplicada}`;
				const vacinasAtualizadas = (morador.vacinasMorador ?? []).filter(
					(vacina) => vacina !== vacinaAplicada
				);
				editarMorador(cpfMorador, {
					...morador,
					vacinasMorador: vacinasAtualizadas,
				});
			}
		}
	};

	return (
		<div className="my-8">
			<h3 className="text-xl font-semibold">Aplicações Registradas</h3>
			{aplicacoes.length > 0 ? (
				<ul className="mt-2 space-y-4">
					{aplicacoes?.filter((aplicacao) => aplicacao !== undefined && aplicacao.cpfMorador).map((aplicacao, index) => (
						
						<li
							key={index}
							className="border rounded-lg p-4 relative shadow-sm"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() =>
										handleDeleteAplicacao(
											aplicacao.vacina.id,
											aplicacao.cpfMorador,
											aplicacao.lote.lote,
											aplicacao.doseAplicada
										)
									}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir aplicação"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%] grid grid-cols-1 md:grid-cols-3 gap-2">
								<p>
									<strong>Morador:</strong>{" "}
									{getMoradorNome(aplicacao.cpfMorador)}
								</p>
								<p>
										<strong>Vacina:</strong> {getVacinaNome(aplicacao.lote.lote)} 
								</p>
								<p>
									<strong>Lote:</strong> {aplicacao.lote.lote}
								</p>
								<p>
									<strong>Dose Aplicada:</strong> {aplicacao.doseAplicada}ª Dose
								</p>
								<p>
									<strong>Data de Aplicação:</strong> {new Date(aplicacao.created_at).toLocaleDateString()}
								</p>							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">
					Nenhuma aplicação registrada ainda.
				</p>
			)}
		</div>
	);
}
