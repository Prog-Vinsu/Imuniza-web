import PageTitle from "../../components/PageTitle";

export default function Sobre() {
	return (
		<>
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<PageTitle title="Sobre o projeto" />
				<p>
					O site Imuniza foi elaborado por 5 estudantes do curso de Ciência da
					Computação da Universidade Federal do Espírito Santo como fruto de
					avaliação principal na disciplina de Banco de Dados, ministrada pela
					Professora Doutora Silvia das Dores Rissino.
				</p>
				<p>
					O objetivo é trabalhar a construção de uma aplicação completa com foco
					máximo na documentação de todos os processos inerentes aos dados
					coletados e utilizados.
				</p>
				<h4 className="font-bold my-4">O enunciado do trabalho:</h4>
				<p>
					"Uma comunidade, às margens do Rio Madeira, na Amazônia brasileira,
					tem aproximadamente 10 famílias. Cada família tem, em média, 4 adultos
					e 5 crianças. A comunidade fica a uma distância de 5 horas de barco da
					capital mais próxima, o que dificulta o transporte de vacinas, sendo
					necessária uma logística para evitar desperdícios. Precisamos
					organizar a vacinação dos moradores.
				</p>
				<p>
					O líder da comunidade necessita de uma pequena aplicação com banco de
					dados para organizar a vacinação da comunidade. Será necessário criar
					uma aplicação que{" "}
					<b>cadastre os moradores da comunidade e as vacinas administradas</b>.
					Lembrando que as vacinas podem ter uma dose ou mais, dependendo do
					tipo."
				</p>
			</section>
		</>
	);
}
