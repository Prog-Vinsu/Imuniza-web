import { Edit, Trash2 } from "react-feather";
import { useVacinas } from "../../../contexts/VacinasContext";

interface Vacina {
	id: string;
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	dosesNecessarias: number;
	intervalo?: number;
	indicacao: string[];
}

export default function ListaVacinas({
	onEdit,
}: {
	onEdit: (vacina: Vacina) => void;
}) {
	const { vacinas, removerVacina, fabricantes } = useVacinas();

	const handleDeleteVacina = (nome: string) => {
		if (
			window.confirm(
				"Tem certeza que deseja excluir esta vacina? Os lotes associados a ela também serão excluídos."
			)
		) {
			removerVacina(nome);
		}
	};

	const getNomeFabricante = (cnpj: string) => {
		const fabricante = fabricantes.find((fab) => fab.cnpj === cnpj);
		return fabricante ? fabricante.nome : "Desconhecido";
	};

	const formatarIndicacoes = (indicacoes: string[]) => {
		if (!indicacoes || indicacoes.length === 0) return "Não informado";

		const nomeIndicacoes: { [key: string]: string } = {
			gestantes: "Gestantes",
			puérperas: "Puérperas",
			"profissionais-saude": "Profissionais de Saúde",
			idosos: "Idosos (60+ anos)",
			criancas: "Crianças (0-11 anos)",
			adolescentes: "Adolescentes (12-17 anos)",
			adultos: "Adultos (18-59 anos)",
			comorbidades: "Pessoas com Comorbidades",
			imunossuprimidos: "Imunossuprimidos",
			indigenas: "Indígenas e Quilombolas",
			essenciais: "Trabalhadores Essenciais",
			"populacao-geral": "População Geral",
		};

		return indicacoes.map((ind) => nomeIndicacoes[ind] || ind).join(", ");
	};

	return (
		<div className="mx-auto my-10">
			<h3 className="text-xl font-semibold">Vacinas Cadastradas</h3>
			{vacinas.length > 0 ? (
				<ul className="mt-2 flex items-center justify-between flex-wrap gap-4">
					{vacinas?.filter((vacina) => vacina !== undefined && vacina.nome).map((vacina) => (
						<li
							key={vacina.id}
							className="border rounded-lg p-4 relative shadow-sm w-[48%]"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEdit(vacina)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar vacina"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDeleteVacina(vacina.id)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir vacina"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%]">
								<p>
									<strong>Nome:</strong> {vacina.nome}
								</p>
								<p>
									<strong>Fabricante:</strong>{" "}
									{getNomeFabricante(vacina.cnpjFabricante)}
									<span className="text-xs text-gray-500 ml-1">
										({vacina.cnpjFabricante})
									</span>
								</p>
								<p>
									<strong>Tipo:</strong> {vacina.tipo}
								</p>
								<p>
									<strong>Doses:</strong> {vacina.dosesNecessarias}
								</p>
								{vacina.intervalo && (
									<p>
										<strong>Intervalo:</strong> {vacina.intervalo}
									</p>
								)}
								<p>
									<strong>Indicações:</strong>{" "}
									{formatarIndicacoes(vacina.indicacao)}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">Nenhuma vacina cadastrada ainda.</p>
			)}
		</div>
	);
}
