import React from "react";

// Definindo o tipo das propriedades que o componente recebe
interface PageTitleProps {
	title: string;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
	return (
		<h1 className="font-bold text-lg w-full text-center my-8">{props.title}</h1>
	);
};

export default PageTitle;
