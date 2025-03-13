import { useState } from "react";
import { Button, Label, Select, TextInput, Spinner } from "flowbite-react";
import { Aplicacao, useAplicacoes } from "../../../contexts/AplicacoesContext";
import { useMoradores } from "../../../contexts/MoradoresContext";
import {
	Fabricante,
	LoteVacina,
	useVacinas,
	Vacina,
} from "../../../contexts/VacinasContext";

export default function FormInputAplicacoes() {
	const { moradores, editarMorador } = useMoradores();
	const { lotes, vacinas, fabricantes } = useVacinas();
	const { aplicacoes, adicionarAplicacao } = useAplicacoes();
	const [formData, setFormData] = useState<Aplicacao>({
		cpfMorador: "",
		loteVacina: "",
		doseAplicada: 1,
		created_at: "00/00/0000",
		updated_at: "00/00/0000", 
		

		lote: {
			lote: "",
			vacina: "",
			validade: "",
		},
		vacina: {
			id: "",
			nome: "",
			cnpjFabricante: "",
			tipo: "",
			dosesNecessarias: 0,
			intervalo: 0,
			indicacao: [],
		},
	});
	const [selectedLote, setSelectedLote] = useState<LoteVacina | null>(null);
	const [selectedVacina, setSelectedVacina] = useState<Vacina | null>(null);
	const [selectedFabricante, setSelectedFabricante] =
		useState<Fabricante | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));

		if (id === "loteVacina") {
			const lote = lotes.find((lote) => lote.lote === value);
			setSelectedLote(lote || null);
			if (lote) {
			  const vacina = vacinas.find((vacina) => {
				const vacinaId = typeof lote.vacina === "object" ? (lote.vacina as any).id : null;
				return vacina.id === vacinaId;
			  });
			  setSelectedVacina(vacina || null);
			  
			  if (vacina) {
				const fabricante = fabricantes.find(
				  (fab) => fab.cnpj === vacina.cnpjFabricante
				);
				setSelectedFabricante(fabricante || null);
			  } else {
				setSelectedFabricante(null);
			  }
			} else {
			  setSelectedVacina(null);
			  setSelectedFabricante(null);
			}
		  }
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const aplicacaoExistente = aplicacoes.filter(
				(aplicacao) =>
					aplicacao.cpfMorador === formData.cpfMorador &&
					String(aplicacao.vacina.id) === String(selectedVacina?.id)
			).some((aplicacao) => Number(aplicacao.doseAplicada) === Number(formData.doseAplicada));

			if (aplicacaoExistente) {
				alert(`Este morador já recebeu a ${formData.doseAplicada}ª dose da vacina ${selectedVacina?.nome}.`);
				setIsLoading(false);
				return;
			}

			const formDataComVacina = {
				...formData,
				idVacina: selectedVacina?.id,
				vacinaLote: selectedLote?.lote, 
			  };
		  
			  // Adiciona a aplicação
			  await adicionarAplicacao(formDataComVacina);
			  alert("Aplicação cadastrada com sucesso!");

			const morador = moradores.find((m) => m.cpf === formData.cpfMorador);
			if (morador) {
				const vacinas = Array.isArray(morador.vacinasMorador) ? morador.vacinasMorador : [];
				const vacinaAplicada = `${selectedVacina?.nome} - Lote: ${formData.loteVacina} - Dose: ${formData.doseAplicada}`;
				const vacinasAtualizadas = [...vacinas, vacinaAplicada];
				editarMorador(formData.cpfMorador, {
					...morador,
					vacinasMorador: vacinasAtualizadas,
				});
			}

			setFormData({
				cpfMorador: "",
				loteVacina: "",
				doseAplicada: 1,
				created_at: "00/00/0000",
				updated_at: "00/00/0000", 

				lote: {
					lote: "",
					vacina: "",
					validade: "",
				},
				vacina: {
					id: "",
					nome: "",
					cnpjFabricante: "",
					tipo: "",
					dosesNecessarias: 0,
					intervalo: 0,
					indicacao: [],
				},
			});
			setSelectedLote(null);
			setSelectedVacina(null);
			setSelectedFabricante(null);
		} catch (error) {
			console.error("Erro ao salvar aplicação:", error);
			alert("Erro ao salvar aplicação. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	function getVacinaName(vacina: any): string {
		if (vacina && typeof vacina === "object" && "nome" in vacina) {
		  return vacina.nome;
		}
		return String(vacina);
	  }

	const sortedMoradores = [...moradores].sort((a, b) =>
		a.nome.localeCompare(b.nome)
	);
	const sortedLotes = [...lotes].sort((a, b) => {
		return getVacinaName(a.vacina).localeCompare(getVacinaName(b.vacina));
	  });

	const dosesAplicadas = aplicacoes
	.filter(
		(aplicacao) =>
			aplicacao.cpfMorador === formData.cpfMorador &&
			String(aplicacao.vacina.id) === String(selectedVacina?.id)
	)
	.map((aplicacao) => Number(aplicacao.doseAplicada));

	return (
		<form
			className="mt-20 mb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full md:col-span-3">
				Registrar Aplicação
			</h3>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cpfMorador" value="CPF do Morador*" />
				</div>
				<Select
					id="cpfMorador"
					required
					value={formData.cpfMorador}
					onChange={handleChange}
					disabled={isLoading}
				>
					<option value="">Selecione um morador</option>
					{sortedMoradores?.filter((morador) => morador && morador.cpf).map((morador) => (
						<option key={morador.cpf} value={morador.cpf}>
							{morador.nome}
						</option>
					))}
				</Select>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="loteVacina" value="Vacina/Lote*" />
				</div>
				<Select
					id="loteVacina"
					required
					value={formData.loteVacina}
					onChange={handleChange}
					disabled={isLoading}
				>
					<option value="">Selecione uma vacina/lote</option>
					{sortedLotes.map((lote) => (
						<option key={lote.lote} value={lote.lote}>
							{getVacinaName(lote.vacina)} - Lote: {lote.lote}
						</option>
					))}
				</Select>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="doseAplicada" value="Dose aplicada*" />
				</div>
				{selectedVacina && selectedVacina.dosesNecessarias === 1 ? (
					<TextInput
						id="doseAplicada"
						name="doseAplicada"
						type="text"
						value="1"
						disabled
						shadow
						required
					/>
				) : (
					<Select
						id="doseAplicada"
						required
						value={formData.doseAplicada}
						onChange={handleChange}
					>
						<option value="">Selecione a dose</option>
						{selectedVacina &&
							Array.from({ length: selectedVacina.dosesNecessarias }, (_, i) => {
								const dose = i + 1;
								const doseAplicada = dosesAplicadas.includes(dose);
								return (
									<option key={dose} value={dose} disabled={doseAplicada}>
										{dose}ª Dose {doseAplicada ? "(Aplicada)" : ""}
									</option>
								);
							})}
					</Select>
				)}
			</div>
			<div className="flex items-center justify-center gap-3 md:col-span-3">
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Spinner size="sm" className="mr-2" />
							Salvando...
						</>
					) : (
						"Registrar Aplicação"
					)}
				</Button>
			</div>
		</form>
	);
}
