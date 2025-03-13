import { useState } from "react";
import { Morador, useMoradores } from "../../contexts/MoradoresContext";
import FormInputMorador from "./components/FormInputMorador";
import ListaMoradores from "./components/ListaMoradores";
import PageTitle from "../../components/PageTitle";

export default function CadastrarMorador() {
	const { deletarMorador } = useMoradores();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingCpf, setEditingCpf] = useState<string | null>(null);
	const [formData, setFormData] = useState<Morador>({
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
	const preencherFormularioParaEdicao = (morador: Morador) => {
		setFormData(morador);
		setIsEditing(true);
		setEditingCpf(morador.cpf);
	};

	return (
		<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
			<PageTitle title="Registro de moradores" />
			<FormInputMorador
				formData={formData}
				setFormData={setFormData}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				editingCpf={editingCpf}
				setEditingCpf={setEditingCpf}
				preencherFormularioParaEdicao={preencherFormularioParaEdicao}
			/>
			<ListaMoradores
				onDelete={deletarMorador}
				onEdit={preencherFormularioParaEdicao}
			/>
		</section>
	);
}
