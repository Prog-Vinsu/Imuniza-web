import { useState, useEffect } from "react";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useVacinas } from "../../../contexts/VacinasContext";
import getEnderecoFromCEP from "../../utils/getEnderecoFromCEP";
import applyMask from "../../utils/applyMask";
import validaCEP from "../../utils/validaCEP";

interface FormData {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento?: string;
}

interface FormInputFabricantesProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	editingCnpj: string | null;
	setEditingCnpj: React.Dispatch<React.SetStateAction<string | null>>;
	preencherFormularioParaEdicao: (fabricante: FormData) => void;
}

export default function FormInputFabricantes({
	formData,
	setFormData,
	isEditing,
	setIsEditing,
	editingCnpj,
	setEditingCnpj,
}: FormInputFabricantesProps) {
	const { fabricantes, adicionarFabricante, editarFabricante } = useVacinas();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isEditing && editingCnpj) {
			setFormData((prev) => ({ ...prev, cnpj: editingCnpj }));
		}
	}, [isEditing, editingCnpj]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		let maskedValue = value;

		if (id === "cnpj") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "##.###.###/####-##");
		}
		if (id === "cep") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "##.###-###");
		}

		setFormData((prevData) => ({
			...prevData,
			[id]: maskedValue,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const cepValido = await validaCEP(formData.cep);
			if (!cepValido) {
				alert("CEP inválido. Por favor, insira um CEP válido.");
				setIsLoading(false);
				return;
			}

			const cnpjExistente = fabricantes.some(
				(fabricante) => fabricante.cnpj === formData.cnpj
			);
			if (cnpjExistente && !isEditing) {
				alert("CNPJ já cadastrado. Por favor, insira um CNPJ diferente.");
				setIsLoading(false);
				return;
			}

			if (isEditing && editingCnpj) {
				await editarFabricante(editingCnpj, formData);
				setIsEditing(false);
				alert("Fabricante editado com sucesso!");
			} else {
				await adicionarFabricante(formData);
				alert("Fabricante cadastrado com sucesso!");
			}

			setFormData({
				cnpj: "",
				nome: "",
				cep: "",
				numero: "",
				complemento: "",
			});
		} catch (error) {
			console.error("Erro ao salvar fabricante:", error);
			alert("Erro ao salvar fabricante. Tente novamente.");
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
				{isEditing ? "Editar Fabricante" : "Cadastre Fabricantes"}
			</h3>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="nome" value="Nome do Fabricante*" />
				</div>
				<TextInput
					id="nome"
					type="text"
					placeholder="Fabricante X"
					required
					shadow
					value={formData.nome}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cnpj" value="CNPJ*" />
				</div>
				<TextInput
					id="cnpj"
					type="text"
					placeholder="00.000.000/0000-00"
					required
					shadow
					value={formData.cnpj}
					onChange={handleChange}
					disabled={isLoading || isEditing}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="cep" value="CEP*" />
				</div>
				<TextInput
					id="cep"
					type="text"
					placeholder="00000-000"
					required
					shadow
					value={formData.cep}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="numero" value="Número*" />
				</div>
				<TextInput
					id="numero"
					type="text"
					placeholder="123"
					required
					shadow
					value={formData.numero}
					onChange={handleChange}
					disabled={isLoading}
				/>
			</div>
			<div className="w-full">
				<div className="mb-2 block">
					<Label htmlFor="complemento" value="Complemento" />
				</div>
				<TextInput
					id="complemento"
					type="text"
					placeholder="Bloco A"
					shadow
					value={formData.complemento}
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
						"Cadastrar Fabricante"
					)}
				</Button>
				{isEditing && (
					<Button
						type="button"
						color="failure"
						onClick={() => {
							setIsEditing(false);
							setEditingCnpj(null);
							setFormData({
								cnpj: "",
								nome: "",
								cep: "",
								numero: "",
								complemento: "",
							});
						}}
					>
						Cancelar Edição
					</Button>
				)}
			</div>
		</form>
	);
}
