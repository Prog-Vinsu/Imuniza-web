import axios from "axios";

const getEnderecoFromCEP = async (cep: string) => {
	try {
		const response = await axios.get(
			`https://brasilapi.com.br/api/cep/v2/${cep}`
		);
		const {
			street: rua,
			neighborhood: bairro,
			city: cidade,
			state: estado,
		} = response.data;

		return { rua, bairro, cidade, estado };
	} catch (error) {
		console.error("Erro ao buscar CEP:", error);
		return null;
	}
};

export default getEnderecoFromCEP;
