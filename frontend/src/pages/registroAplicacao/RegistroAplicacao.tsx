import PageTitle from "../../components/PageTitle";
import FormInputAplicacoes from "./components/FormInputAplicacoes";
import ListaAplicacoes from "./components/ListaAplicacoes";

export default function RegistroAplicacao() {
	return (
		<section className="mx-auto max-w-[1280px] my-10 px-8 w-full scroll-smooth">
			<PageTitle title="Registrar aplicação de vacinas" />
			<FormInputAplicacoes />
			<ListaAplicacoes />
		</section>
	);
}
