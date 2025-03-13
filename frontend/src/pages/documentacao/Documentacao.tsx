import { JSX } from "react";
import casosDeUso from "../../assets/imagens/casos_de_uso.png";
import classes from "../../assets/imagens/classes.jpg";
import conceitual from "../../assets/imagens/conceitual.jpg";
import logico from "../../assets/imagens/logico.jpg";
import PageTitle from "../../components/PageTitle";

export default function Documentacao(): JSX.Element {
	return (
		<>
			<PageTitle title="Documentação" />
			<section className="max-w-[1280px] px-8 w-full my-8 mx-auto">
				<div className="w-full text-center mx-auto">
					<div id="casosDeUso" className="my-60">
						<h2 className="font-bold text-xl">Diagrama de casos de uso</h2>
						<div className="flex items-center justify-between w-full mx-auto my-4">
							<div className="w-1/2">
								<p className="text-justify mb-5">
									Os diagramas de casos de uso são uma forma de representar as
									funcionalidades de um sistema. Eles são úteis para entender
									como usuários interagem com o sistema e quais são as
									principais funcionalidades que ele deve ter.
								</p>
								<p className="text-justify">
									Os casos de uso desse sistema são as funcionalidades básicas
									de cadastro, edição, visualização e remoção de dados.
								</p>
							</div>
							<img
								className="block mx-auto"
								src={casosDeUso}
								alt="Diagrama de casos de uso"
							/>
						</div>
					</div>
					<div id="classes" className="my-60">
						<h2 className="font-bold text-xl">Diagrama de classes</h2>
						<div className="flex items-center justify-between w-full mx-auto gap-4">
							<img
								className="block mx-auto w-2/3"
								src={classes}
								alt="Diagrama de classes"
							/>
							<div className="w-1/2">
								<p className="text-justify mb-5">
									Os diagramas de classes são uma forma de representar as
									classes e os relacionamentos entre elas em um sistema. Eles
									são úteis para entender como as classes se relacionam e como o
									sistema funciona.
								</p>
								<p className="text-justify">
									As classes desse sistema são as entidades que representam os
									dados do sistema, como <b>Fabricante</b>, <b>Vacina</b>,
									<b>Vacina Lote</b>, <b>Aplicação</b> e <b>Morador</b>.
								</p>
							</div>
						</div>
					</div>
					<div id="conceitual" className="my-60">
						<h2 className="font-bold text-xl">
							Modelo Conceitual (Modelo de Entidade-Relacionamento)
						</h2>
						<div className="flex items-center justify-between w-full mx-auto gap-4">
							<div className="w-1/2">
								<p className="text-justify mb-5">
									O modelo conceitual é uma forma de representar as entidades e
									os relacionamentos entre elas em um sistema. Ele é útil para
									entender como as entidades se relacionam e como o sistema
									funciona.
								</p>
								<p className="text-justify">
									As entidades desse sistema são as entidades que representam os
									dados do sistema, como <b>Fabricantes</b>, <b>Vacinas</b>,
									<b>Vacina Lotes</b>, <b>Aplicações</b> e <b>Moradores</b>.
								</p>
							</div>
							<img
								className="block mx-auto w-2/3"
								src={conceitual}
								alt="Modelo de dados conceitual"
							/>
						</div>
					</div>
					<div id="logico" className="my-60">
						<h2 className="font-bold text-xl">
							Modelo Lógico (Modelo de Entidade-Relacionamento)
						</h2>
						<div className="flex items-center justify-between w-full mx-auto gap-4">
							<div className="w-1/2">
								<p className="text-justify mb-5">
									O modelo conceitual é uma forma de representar as entidades e
									os relacionamentos entre elas em um sistema. Ele é útil para
									entender como as entidades se relacionam e como o sistema
									funciona.
								</p>
								<p className="text-justify">
									As entidades desse sistema são as entidades que representam os
									dados do sistema, como <b>Fabricantes</b>, <b>Vacinas</b>,
									<b>Vacina Lotes</b>, <b>Aplicações</b> e <b>Moradores</b>.
								</p>
							</div>
							<img
								className="block mx-auto w-2/3"
								src={logico}
								alt="Modelo de dados lógico"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
