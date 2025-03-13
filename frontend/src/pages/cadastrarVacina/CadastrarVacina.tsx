import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import ListaVacinas from "./components/ListaVacinas";
import FormInputFabricantes from "./components/FormInputFabricantes";
import FormInputVacina from "./components/FormInputVacina";
import FormInputVacinaLote from "./components/FormInputVacinaLote";
import ListaFabricantes from "./components/ListaFabricantes";
import ListaLotes from "./components/ListaLotes";
import { set } from "react-hook-form";

interface Fabricante {
	cnpj: string;
	nome: string;
	cep: string;
	numero: string;
	complemento?: string;
}

interface Vacina {
	id: string;
	nome: string;
	cnpjFabricante: string;
	tipo: string;
	dosesNecessarias: number;
	intervalo?: number;
	indicacao: string[];
}

interface LoteVacina {
	lote: string;
	vacina: string;
	validade: string;
	quantidade?: number;
	dataRecebimento?: string;
	observacoes?: string;
}

export default function CadastrarVacina() {
	const [formDataFabricante, setFormDataFabricante] = useState<Fabricante>({
		cnpj: "",
		nome: "",
		cep: "",
		numero: "",
		complemento: "",
	});
	const [isEditingFabricante, setIsEditingFabricante] =
		useState<boolean>(false);
	const [editingCnpjFabricante, setEditingCnpjFabricante] = useState<
		string | null
	>(null);
	const [editingIdVacinaLote, setEditingIdVacinaLote] = useState<string | null>(null);

	const [formDataVacina, setFormDataVacina] = useState<Vacina>({
		id: "",
		nome: "",
		cnpjFabricante: "",
		tipo: "",
		dosesNecessarias: 1,
		intervalo: 0,
		indicacao: [],
	});
	const [isEditingVacina, setIsEditingVacina] = useState<boolean>(false);
	const [editingVacinaId, setEditingVacinaId] = useState<string | null>(
		null
	);

	const [formDataLote, setFormDataLote] = useState<LoteVacina>({
		lote: "",
		vacina: "",
		validade: "",
	});
	const [isEditingLote, setIsEditingLote] = useState<boolean>(false);
	const [editingNumeroLote, setEditingNumeroLote] = useState<string | null>(
		null
	);

	const preencherFormularioParaEdicaoFabricante = (fabricante: Fabricante) => {
		setFormDataFabricante(fabricante);
		setIsEditingFabricante(true);
		setEditingCnpjFabricante(fabricante.cnpj);
	};

	const preencherFormularioParaEdicaoVacina = (vacina: Vacina) => {
		setFormDataVacina(vacina);
		setIsEditingVacina(true);
		setEditingVacinaId(vacina.id);
	};

	const preencherFormularioParaEdicaoLote = (lote: LoteVacina) => {
		const idVacina = (lote.vacina as any)?.id;
		setFormDataLote(lote);
		setIsEditingLote(true);
		setEditingIdVacinaLote(idVacina);
		setEditingNumeroLote(lote.lote);
	};

	return (
		<section className="mx-auto max-w-[1280px] my-10 px-8 w-full scroll-smooth">
			<PageTitle title="Cadastro de Vacinas" />
			<div className="mx-auto flex items-center justify-center gap-8 text-xl ">
				<a
					href="#fabricantes"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Fabricantes
				</a>
				<a
					href="#vacinas"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Vacinas
				</a>
				<a
					href="#lotes"
					className="border-b-2 border-b-cyan-300 hover:font-bold hover:border-b-[#0E7490] transition-all duration-300 ease-in-out"
				>
					Lotes
				</a>
			</div>
			<div className="">
				<div id="fabricantes">
					<FormInputFabricantes
						formData={formDataFabricante}
						setFormData={setFormDataFabricante}
						isEditing={isEditingFabricante}
						setIsEditing={setIsEditingFabricante}
						editingCnpj={editingCnpjFabricante}
						setEditingCnpj={setEditingCnpjFabricante}
						preencherFormularioParaEdicao={
							preencherFormularioParaEdicaoFabricante
						}
					/>
					<ListaFabricantes
						onEdit={preencherFormularioParaEdicaoFabricante}
						onDelete={() => {
							setIsEditingFabricante(false);
							setEditingCnpjFabricante(null);
							setFormDataFabricante({
								cnpj: "",
								nome: "",
								cep: "",
								numero: "",
								complemento: "",
							});
						}}
					/>
				</div>
				<hr className="my-8" />
				<div id="vacinas">
					<FormInputVacina
						formData={formDataVacina}
						setFormData={setFormDataVacina}
						isEditing={isEditingVacina}
						setIsEditing={setIsEditingVacina}
						editingVacina={editingVacinaId}
						setEditingVacina={setEditingVacinaId}
						preencherFormularioParaEdicao={preencherFormularioParaEdicaoVacina}
					/>
					<ListaVacinas onEdit={preencherFormularioParaEdicaoVacina} />
				</div>
				<hr className="my-8" />
				<div id="lotes">
					<FormInputVacinaLote
						formData={formDataLote}
						setFormData={setFormDataLote}
						isEditing={isEditingLote}
						setIsEditing={setIsEditingLote}
						editingNumeroLote={editingNumeroLote}
						setEditingNumeroLote={setEditingNumeroLote}
						editingIdVacinaLote={editingIdVacinaLote}
						setEditingIdVacinaLote={setEditingIdVacinaLote}
						preencherFormularioParaEdicao={preencherFormularioParaEdicaoLote}
					/>
					<ListaLotes onEdit={preencherFormularioParaEdicaoLote} />
				</div>
				<hr className="my-8" />
			</div>
		</section>
	);
}
