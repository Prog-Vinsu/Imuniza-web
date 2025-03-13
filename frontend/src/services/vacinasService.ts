import axios from "axios";
import { Vacina } from "../contexts/VacinasContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getVacinas(): Promise<Vacina[]> {
    const response = await axios.get(`${API_URL}/vacinas`);
    return response.data.data
}

export async function createVacina(vacina: Vacina): Promise<Vacina> {
    const response = await axios.post(`${API_URL}/vacinas`, vacina);
    return response.data.data
}

export async function updateVacina(
        idVacina: string, 
        novosDadosVacina: Vacina
    ): Promise<Vacina> {
    const response = await axios.put(`${API_URL}/vacinas/${idVacina}`, novosDadosVacina);
    return response.data.data
}

export async function deleteVacina(idVacina: string): Promise<void> {
    await axios.delete(`${API_URL}/vacinas/${idVacina}`);
}
