import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { JSX, useState } from "react";
import { useMoradores } from "../../../contexts/MoradoresContext";
import { Morador } from "../../../contexts/MoradoresContext";
import getEnderecoFromCEP from "../../utils/getEnderecoFromCEP";
import applyMask from "../../utils/applyMask";
import { ResponseErrorType } from "../../../services/api";

interface FormInputMoradorProps {
	formData: Morador;
	setFormData: React.Dispatch<React.SetStateAction<Morador>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	editingCpf: string | null;
	setEditingCpf: React.Dispatch<React.SetStateAction<string | null>>;
	preencherFormularioParaEdicao: (morador: Morador) => void;
	error?: ResponseErrorType | null;
}

export default function FormInputMorador({
	formData,
	setFormData,
	isEditing,
	setIsEditing,
	editingCpf,
	setEditingCpf,
	error,
}: FormInputMoradorProps): JSX.Element {
	const { adicionarMorador, editarMorador, moradores } = useMoradores();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		let maskedValue = value;

		if (name === "cpf") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "###.###.###-##");
		}
		if (name === "cep") {
			maskedValue = applyMask(value.replace(/\D/g, ""), "##.###-###");
		}
		if (name === "sus") {
        	maskedValue = value.length > 15 ? value.substring(0, 15) : value; // Limita a 15 caracteres
    	}
		if (name === "vacinas") {
			setFormData((prevState) => {
				const vacinasSelecionadas = checked
					? [...prevState.vacinasMorador, value]
					: prevState.vacinasMorador.filter((vacina) => vacina !== value);
				return {
					...prevState,
					vacinas: vacinasSelecionadas,
				};
			});
		} else if (name === "planoSaude") {
			setFormData((prevState) => ({
				...prevState,
				planoSaude: value === "Sim",
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: type === "checkbox" ? checked : maskedValue,
			}));
		}
	};

	const validaCEP = async (cep: string): Promise<boolean> => {
		try {
			const endereco = await getEnderecoFromCEP(cep);
			return !!endereco;
		} catch (error) {
			console.error("Erro ao validar CEP:", error);
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const cepValido = await validaCEP(formData.cep);
			if (!cepValido) {
				alert("CEP inválido. Por favor, insira um CEP válido.");
				return;
			}

			const cpfExistente = moradores.some(
				(morador) => morador.cpf === formData.cpf
			);
			if (cpfExistente && !isEditing) {
				alert("CPF já cadastrado. Por favor, insira um CPF diferente.");
				return;
			}

			const dataNasc = new Date(formData.dataNasc);
            const dataAtual = new Date();
            if (dataNasc > dataAtual) {
                alert("A data de nascimento não pode ser futura.");
                setIsLoading(false);
                return;
            }

			if (isEditing && editingCpf) {
				editarMorador(editingCpf, formData);
				setIsEditing(false);
				setEditingCpf(null);
				alert("Morador editado com sucesso!");
			} else {
				adicionarMorador(formData);
				alert("Morador cadastrado com sucesso!");
			}

			setFormData({
				nome: "",
				cpf: "",
				sus: "",
				cep: "",
				numero: "",
				complemento: "",
				dataNasc: new Date(),
				nomeMae: "",
				sexo: "",
				estadoCivil: "",
				escolaridade: "",
				etnia: "",
				planoSaude: false,
				vacinasMorador: [],
			});
		} catch (error) {
			console.error("Erro ao salvar morador:", error);
			alert("Erro ao salvar morador. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form
				className="flex flex-row justify-between items-center gap-4 mx-auto flex-wrap"
				onSubmit={handleSubmit}
			>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="nome" value="Nome do Morador*" />
					</div>
					<TextInput
						id="nome"
						name="nome"
						type="text"
						value={formData.nome}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading}
					/>
					{error?.errors?.nome && (
						<div className="text-red-500 text-sm mt-1">
						{error.errors.nome}
						</div>
					)}
				</div>

				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="cartaoSUS" value="Cartão do SUS" />
					</div>
					<TextInput
						id="cartaoSUS"
						name="sus"
						type="text"
						value={formData.sus}
						onChange={handleChange}
						shadow
						disabled={isLoading}
					/>
				</div>

				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="cpf" value="CPF*" />
					</div>
					<TextInput
						id="cpf"
						name="cpf"
						type="text"
						value={formData.cpf}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading || isEditing}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="cep" value="Cep*" />
					</div>
					<TextInput
						id="cep"
						name="cep"
						type="text"
						value={formData.cep}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="numero" value="Número*" />
					</div>
					<TextInput
						id="numero"
						name="numero"
						type="text"
						value={formData.numero}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="complemento" value="Complemento" />
					</div>
					<TextInput
						id="complemento"
						name="complemento"
						type="text"
						value={formData.complemento}
						onChange={handleChange}
						shadow
						disabled={isLoading}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="dataNasc" value="Data de Nascimento*" />
					</div>
					<TextInput
						id="dataNasc"
						name="dataNasc"
						type="date"
						value={
							typeof formData.dataNasc === "string"
							? formData.dataNasc
							: new Date(formData.dataNasc).toISOString().split("T")[0]
						}
						onChange={handleChange}
						placeholder="DD/MM/AAAA"
						required
						shadow
						disabled={isLoading}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="nomeMae" value="Nome da Mãe*" />
					</div>
					<TextInput
						id="nomeMae"
						name="nomeMae"
						type="text"
						value={formData.nomeMae}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading}
					/>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="estadoCivil" value="Estado Civil*" />
					</div>
					<TextInput
						id="estadoCivil"
						name="estadoCivil"
						type="text"
						value={formData.estadoCivil}
						onChange={handleChange}
						required
						shadow
						disabled={isLoading}
					/>
					{error?.errors?.estadoCivil && (
						<p className="text-red-500 text-sm mt-1">
						{error.errors.estadoCivil}
						</p>
					)}
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="sexo" value="Sexo*" />
					</div>
					<div className="flex flex-wrap gap-4">
						<div>
							<input
								id="sexo-masculino"
								name="sexo"
								type="radio"
								value="Masculino"
								checked={formData.sexo === "Masculino"}
								onChange={handleChange}
								required
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="sexo-masculino" value="Masculino" />
						</div>
						<div>
							<input
								id="sexo-feminino"
								name="sexo"
								type="radio"
								value="Feminino"
								checked={formData.sexo === "Feminino"}
								onChange={handleChange}
								required
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="sexo-feminino" value="Feminino" />
						</div>
						<div>
							<input
								id="sexo-nb"
								name="sexo"
								type="radio"
								value="Não Binário"
								checked={formData.sexo === "Não Binário"}
								onChange={handleChange}
								required
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="sexo-nb" value="Não Binário" />
							{error?.errors?.sexo && (
								<p className="text-red-500 text-sm mt-1">
								{error.errors.sexo}
								</p>
							)}
						</div>
						<div>
							<input
								id="sexo-na"
								name="sexo"
								type="radio"
								value="Prefere não dizer"
								checked={formData.sexo === "Prefere não dizer"}
								onChange={handleChange}
								required
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="sexo-na" value="Prefere não dizer" />
						</div>
					</div>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="escolaridade" value="Escolaridade*" />
					</div>
					<div className="flex gap-4 flex-wrap">
						<div className="flex items-center">
							<input
								type="radio"
								id="fundamental"
								name="escolaridade"
								value="Fundamental"
								checked={formData.escolaridade === "Fundamental"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="fundamental" value="Fundamental Completo" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="medio"
								name="escolaridade"
								value="Médio"
								checked={formData.escolaridade === "Médio"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="medio" value="Médio Completo" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="superior"
								name="escolaridade"
								value="Superior"
								checked={formData.escolaridade === "Superior"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="superior" value="Superior Completo" />
						</div>
					</div>
				</div>
				<div className="w-[30%]">
					<div className="mb-2 block">
						<Label htmlFor="etnia" value="Etnia*" />
					</div>
					<div className="flex flex-wrap gap-4">
						<div className="flex items-center">
							<input
								type="radio"
								id="branca"
								name="etnia"
								value="Branca"
								checked={formData.etnia === "Branca"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="branca" value="Branca" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="negra"
								name="etnia"
								value="Negra"
								checked={formData.etnia === "Negra"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="negra" value="Negra" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="parda"
								name="etnia"
								value="Parda"
								checked={formData.etnia === "Parda"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="parda" value="Parda" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="amarela"
								name="etnia"
								value="Amarela"
								checked={formData.etnia === "Amarela"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="amarela" value="Amarela" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="indigena"
								name="etnia"
								value="Indígena"
								checked={formData.etnia === "Indígena"}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="indigena" value="Indígena" />
						</div>
					</div>
				</div>
				<div className="w-full">
					<div className="mb-2 block">
						<Label htmlFor="planoSaude" value="Tem plano de saúde?" />
					</div>
					<div className="flex gap-4">
						<div className="flex items-center">
							<input
								type="radio"
								id="sim"
								name="planoSaude"
								value="Sim"
								checked={formData.planoSaude === true}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="sim" value="Sim" />
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								id="nao"
								name="planoSaude"
								value="Não"
								checked={formData.planoSaude === false}
								onChange={handleChange}
								className="mr-2"
								disabled={isLoading}
							/>
							<Label htmlFor="nao" value="Não" />
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-3 w-full">
					<Button type="submit" className="" disabled={isLoading}>
						{isLoading ? (
							<>
								<Spinner size="sm" className="mr-2" />
								Salvando...
							</>
						) : isEditing ? (
							"Salvar Alterações"
						) : (
							"Cadastrar Morador"
						)}
					</Button>
					{isEditing && (
						<Button
							type="button"
							color="failure"
							className=""
							onClick={() => {
								setIsEditing(false);
								setEditingCpf(null);
								setFormData({
									nome: "",
									cpf: "",
									sus: "",
									cep: "",
									numero: "",
									complemento: "",
									dataNasc: new Date(0),
									nomeMae: "",
									sexo: "",
									estadoCivil: "",
									escolaridade: "",
									etnia: "",
									planoSaude: false,
									vacinasMorador: [],
								});
							}}
						>
							Cancelar Edição
						</Button>
					)}
				</div>
			</form>
		</>
	);
}
