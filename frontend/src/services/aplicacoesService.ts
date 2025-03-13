import axios from "axios";
import { Aplicacao } from "../contexts/AplicacoesContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getAplicacoes(): Promise<Aplicacao[]> {
    const response = await axios.get(`${API_URL}/aplicacoes`);
    return response.data.data;
}

export async function createAplicacao(aplicacao: Aplicacao): Promise<Aplicacao> {
    try {
        const response = await axios.post(`${API_URL}/aplicacoes`, aplicacao);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erro ao criar aplicação:", error.response?.data);
            alert(`Erro: ${error.response?.data.message}`);
        } else {
            console.error("Erro desconhecido:", error);
            alert("Erro desconhecido. Tente novamente.");
        }
        throw error;
    }
}

export async function updateAplicacao(
        cpfMorador: string,
        loteVacina: string,
        novosDadosAplicacao: Aplicacao
    ): Promise<Aplicacao> {
    const response = await axios.put(`${API_URL}/aplicacoes/${loteVacina}/${cpfMorador}`, novosDadosAplicacao);
    return response.data.data;
}

export async function deleteAplicacao(
        idVacina: string,
        cpfMorador: string,
        loteVacina: string,
        doseAplicada: number
    ): Promise<void> {
        console.log("doseAplicada: ", doseAplicada)
    await axios.delete(`${API_URL}/aplicacoes/${idVacina}/${loteVacina}/${cpfMorador}/${doseAplicada}`);
}