import { useEffect, useState } from "react";
import { useMoradores } from "../../../contexts/MoradoresContext";
import getEnderecoFromCEP from "./../../utils/getEnderecoFromCEP";
import { Edit, Trash2 } from "react-feather";
import { getMoradores } from "../../../services/moradorService";

interface Morador {
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

export default function ListaMoradores({
	onDelete,
	onEdit,
}: {
	onDelete: (cpf: string) => void;
	onEdit: (morador: Morador) => void;
}) {
	const { moradores } = useMoradores();
	const [enderecos, setEnderecos] = useState<{
		[key: string]: {
			rua: string;
			bairro: string;
			cidade: string;
			estado: string;
		};
	}>({});

	useEffect(() => {
		moradores.forEach(async (morador) => {
		  if (!morador) return;
		  if (morador.cep) {
			const endereco = await getEnderecoFromCEP(morador.cep);
			if (endereco) {
			  setEnderecos((prevEnderecos) => ({
				...prevEnderecos,
				[morador.cep]: endereco,
			  }));
			}
		  }
		});

	  }, [moradores]);

	const calcularIdade = (dataNasc: Date) => {
		const hoje = new Date();
		const nascimento = new Date(dataNasc);
		let idade = hoje.getFullYear() - nascimento.getFullYear();
		const mesAtual = hoje.getMonth();
		const mesNascimento = nascimento.getMonth();

		if (
			mesAtual < mesNascimento ||
			(mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
		) {
			idade--;
		}

		return idade;
	};

	const handleDelete = (cpf: string) => {
		if (window.confirm("Tem certeza que deseja excluir este morador?")) {
			onDelete(cpf);
		}
	};

	return (
		<div className="mx-auto my-10">
			<h3 className="text-xl font-semibold">Moradores Cadastrados</h3>
			{moradores.length > 0 ? (
				<ul className="mt-2 flex items-center justify-between flex-wrap gap-4">
					{moradores
						?.filter((morador) => morador !== undefined)
						.map((morador)=> (
						<li
							key={morador.cpf}
							className="border rounded-lg p-4 relative shadow-sm w-[48%]"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEdit(morador)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar morador"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDelete(morador.cpf)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir morador"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%]">
								<p>
									<strong>Nome:</strong> {morador.nome}
								</p>
								<p>
									<strong>CPF:</strong> {morador.cpf}
								</p>
								<p>
									<strong>Cartão do SUS:</strong>{" "}
									{morador.sus ? morador.sus : "Não informado"}
								</p>
								<p>
									<strong>Endereço: </strong>
									{enderecos[morador.cep] ? (
										<>
											{enderecos[morador.cep].rua &&
											enderecos[morador.cep].bairro ? (
												<>
													{enderecos[morador.cep].rua}, {morador.numero}
													{morador.complemento &&
														`, ${morador.complemento}`},{" "}
													{enderecos[morador.cep].bairro},{" "}
													{enderecos[morador.cep].cidade} -{" "}
													{enderecos[morador.cep].estado} - {morador.cep}
												</>
											) : (
												<>
													{morador.numero}
													{morador.complemento &&
														`, ${morador.complemento}`},{" "}
													{enderecos[morador.cep].cidade} -{" "}
													{enderecos[morador.cep].estado} - {morador.cep}
												</>
											)}
										</>
									) : (
										<span>Carregando endereço...</span>
									)}
								</p>
								<p>
									<strong>Data de nascimento: </strong>
									{new Date(morador.dataNasc).toLocaleDateString("pt-BR", {
										timeZone: "UTC",
									})}
								</p>
								<p>
									<strong>Idade: </strong> {calcularIdade(morador.dataNasc)}{" "}
									anos
								</p>
								<p>
									<strong>Nome da mãe: </strong> {morador.nomeMae}
								</p>
								<p>
									<strong>Sexo: </strong> {morador.sexo}
								</p>
								<p>
									<strong>Estado civil: </strong> {morador.estadoCivil}
								</p>
								<p>
									<strong>Escolaridade: </strong> {morador.escolaridade}
								</p>
								<p>
									<strong>Etnia: </strong> {morador.etnia}
								</p>
								<p>
									<strong>Tem plano de saúde? </strong>
									{morador.planoSaude ? "Sim" : "Não"}
								</p>
								<div className="md:col-span-2">
									<strong>Vacinas tomadas: </strong>
									{Array.isArray(morador.vacinasMorador) && morador.vacinasMorador.length > 0 ? (
										<ul className="list-disc list-inside">
										{(morador.vacinasMorador ?? []).map((vacina, index) => (
											<li key={index}>
												{typeof vacina === 'object' && (vacina as { vacinaNome?: string }).vacinaNome ? (
													<>
														{(vacina as { vacinaNome: string }).vacinaNome} -&nbsp; 
														{(vacina as { vacinaLote: string }).vacinaLote} -&nbsp; 
														Dose {(vacina as { doseAplicada: number }).doseAplicada}
													</>
												) : 'Informação da vacina inválida'}
											</li>
										))}
										</ul>
									) : (
										<p>Ainda sem vacinas registradas.</p>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">Nenhum morador cadastrado ainda.</p>
			)}
		</div>
	);
}
