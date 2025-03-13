import { useState, useEffect } from "react";
import { Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import { LoteVacina, useVacinas } from "../../../contexts/VacinasContext";

interface FormData {
	lote: string;
	vacina: string;
	validade: string;
}

interface FormInputVacinaLoteProps {
	formData: LoteVacina;
	setFormData: React.Dispatch<React.SetStateAction<LoteVacina>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	editingNumeroLote: string | null;
	setEditingNumeroLote: React.Dispatch<React.SetStateAction<string | null>>;
	editingIdVacinaLote: string | null;
	setEditingIdVacinaLote: React.Dispatch<React.SetStateAction<string | null>>;
	preencherFormularioParaEdicao: (lote: LoteVacina) => void;
}

export default function FormInputVacinaLote({
	formData,
	setFormData,
	isEditing,
	setIsEditing,
	editingNumeroLote,
	setEditingNumeroLote,
	editingIdVacinaLote,
	setEditingIdVacinaLote,
	preencherFormularioParaEdicao,
}: FormInputVacinaLoteProps) {
	const { adicionarLote, editarLote, lotes, vacinas } = useVacinas();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const validadeDate = new Date(formData.validade);
			const today = new Date();
			validadeDate.setHours(0, 0, 0, 0);
			today.setHours(0, 0, 0, 0);
			if (validadeDate < today) {
				alert(
					"A data de validade não pode ser anterior ao dia atual. O lote está vencido."
				);
				setIsLoading(false);
				return;
			}

			const loteExistente = lotes.some(
				(lote) =>
					lote.lote === formData.lote &&
					(!isEditing || lote.lote !== editingNumeroLote)
			);
			if (loteExistente) {
				alert(
					"Já existe um lote com este número. Por favor, insira um número de lote diferente."
				);
				setIsLoading(false);
				return;
			}

			if (isEditing && editingNumeroLote && editingIdVacinaLote) {
				editarLote(editingIdVacinaLote, editingNumeroLote, formData);
				setIsEditing(false);
				setEditingNumeroLote(null);
				setEditingIdVacinaLote(null);
				alert("Lote editado com sucesso!");
			} else {
				await adicionarLote(formData);
				alert("Lote cadastrado com sucesso!");
			}

			setFormData({ lote: "", vacina: "", validade: "" });
		} catch (error) {
			console.error("Erro ao salvar Lote de Vacina:", error);
			alert("Erro ao salvar Lote de Vacina. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="mt-20 mb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
			onSubmit={handleSubmit}
		>
			<h3 className="text-xl font-semibold w-full md:col-span-3">
				{isEditing ? "Editar Lote" : "Cadastrar Lote"}
			</h3>

			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="vacina" value="Vacina*" />
				</div>
				<Select
					id="vacina"
					required
					value={formData.vacina}
					onChange={handleChange}
					disabled={isLoading || isEditing}
				>
					<option value="">Selecione uma vacina</option>
					{Array.isArray(vacinas) && vacinas.filter(v => v !== undefined).map((vacina) => (
						<option key={vacina.id} value={vacina.id}>
							{vacina.nome}
						</option>
					))}
				</Select>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="lote" value="Número do Lote*" />
				</div>
				<TextInput
					id="lote"
					type="text"
					placeholder="123456"
					required
					shadow
					value={formData.lote}
					onChange={handleChange}
					disabled={isLoading || isEditing}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="validade" value="Data de Validade*" />
				</div>
				<TextInput
					id="validade"
					type="date"
					required
					shadow
					value={formData.validade}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="flex items-center justify-center gap-3 md:col-span-3">
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Spinner size="sm" className="mr-2" />
							Salvando...
						</>
					) : isEditing ? (
						"Salvar Alterações"
					) : (
						"Cadastrar Lote"
					)}
				</Button>
				{isEditing && (
					<Button
						type="button"
						color="failure"
						onClick={() => {
							setIsEditing(false);
							setEditingNumeroLote(null);
							setEditingIdVacinaLote(null);
							setFormData({ lote: "", vacina: "", validade: "" });
						}}
					>
						Cancelar Edição
					</Button>
				)}
			</div>
		</form>
	);
}
