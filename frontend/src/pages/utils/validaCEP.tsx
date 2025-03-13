import getEnderecoFromCEP from "./getEnderecoFromCEP";

const validaCEP = async (cep: string): Promise<boolean> => {
	try {
		const cepNumerico = cep.replace(/\D/g, "");
		const endereco = await getEnderecoFromCEP(cepNumerico);
		return !!endereco;
	} catch (error) {
		console.error("Erro ao validar CEP:", error);
		return false;
	}
};

export default validaCEP;
