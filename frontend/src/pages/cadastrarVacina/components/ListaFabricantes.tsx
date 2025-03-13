import { useEffect, useState } from "react";
import { useVacinas } from "../../../contexts/VacinasContext";
import getEnderecoFromCEP from "../../utils/getEnderecoFromCEP";
import { Edit, Trash2 } from "react-feather";
import applyMask from "../../utils/applyMask";

interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento?: string;
}

export default function ListaFabricantes({
	onEdit,
	onDelete,
}: {
	onEdit: (fabricante: Fabricante) => void;
	onDelete: (cnpj: string) => void;
}) {
	const { fabricantes, removerFabricante } = useVacinas();
	const [enderecos, setEnderecos] = useState<{
		[key: string]: {
			rua: string;
			bairro: string;
			cidade: string;
			estado: string;
		};
	}>({});

	useEffect(() => {
		fabricantes
		  ?.filter((fabricante) => fabricante !== undefined)
		  .forEach(async (fabricante) => {
			if (fabricante.cep) {
			  const endereco = await getEnderecoFromCEP(fabricante.cep);
			  if (endereco) {
				setEnderecos((prevEnderecos) => ({
				  ...prevEnderecos,
				  [fabricante.cep]: endereco,
				}));
			  }
			}
		  });
	  }, [fabricantes]);

	const handleDelete = (cnpj: string) => {
		if (
			window.confirm(
				"Tem certeza que deseja excluir este fabricante? As vacinas associadas a ele também serão excluídas."
			)
		) {
			removerFabricante(cnpj);
			onDelete(cnpj);
		}
	};

	return (
		<div className="mx-auto my-10">
			<h3 className="text-xl font-semibold">Fabricantes Cadastrados</h3>
			{fabricantes.length > 0 ? (
				<ul className="mt-2 flex items-center justify-between flex-wrap gap-4">
					{fabricantes?.filter((fabricante) => fabricante && fabricante.cnpj && fabricante.nome && fabricante.cep).map((fabricante) => (
						<li
							key={fabricante.cnpj}
							className="border rounded-lg p-4 relative shadow-sm w-[48%]"
						>
							<div className="absolute right-4 top-[50%] translate-y-[-50%] flex flex-col gap-2">
								<button
									onClick={() => onEdit(fabricante)}
									className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
									title="Editar fabricante"
								>
									<Edit size={20} />
								</button>
								<button
									onClick={() => handleDelete(fabricante.cnpj)}
									className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
									title="Excluir fabricante"
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="max-w-[92%]">
								<p>
									<strong>Nome:</strong> {fabricante.nome}
								</p>
								<p>
									<strong>CNPJ:</strong> {applyMask((fabricante.cnpj || "").replace(/\D/g, ""), "##.###.###/####-##")}
								</p>
								<p>
									<strong>Endereço: </strong>
									{enderecos[fabricante.cep] ? (
										<>
											{enderecos[fabricante.cep].rua &&
											enderecos[fabricante.cep].bairro ? (
												<>
													{enderecos[fabricante.cep].rua}, {fabricante.numero}
													{fabricante.complemento &&
														`, ${fabricante.complemento}`}
													, {enderecos[fabricante.cep].bairro},{" "}
													{enderecos[fabricante.cep].cidade} -{" "}
													{enderecos[fabricante.cep].estado} - {fabricante.cep}
												</>
											) : (
												<>
													{fabricante.numero}
													{fabricante.complemento &&
														`, ${fabricante.complemento}`}
													, {enderecos[fabricante.cep].cidade} -{" "}
													{enderecos[fabricante.cep].estado} - {fabricante.cep}
												</>
											)}
										</>
									) : (
										<span>Carregando endereço através do CEP...</span>
									)}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">
					Nenhum fabricante cadastrado ainda.
				</p>
			)}
		</div>
	);
}
