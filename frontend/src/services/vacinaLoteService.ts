import axios from "axios";
import { LoteVacina } from "../contexts/VacinasContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getVacinaLotes(): Promise<LoteVacina[]> {
    const response = await axios.get(`${API_URL}/vacina-lotes`);
    return response.data.data
}

export async function createVacinaLote(vacinaLote: LoteVacina): Promise<LoteVacina> {
    const payload = {
        ...vacinaLote,
        idVacina: vacinaLote.vacina
    };
    const response = await axios.post(`${API_URL}/vacina-lotes`, payload);    
    return response.data.data
}

export async function updateVacinaLote(
        idVacina: string,
        lote: string,
        novosDadosVacinaLote: LoteVacina
    ): Promise<LoteVacina> {
        const payload = {
            ...novosDadosVacinaLote,
            idVacina: novosDadosVacinaLote.vacina, 
        };
    const response = await axios.put(`${API_URL}/vacina-lotes/${idVacina}/${lote}`, payload);    
    return response.data.data
}

export async function deleteVacinaLote(idVacina: string, lote: string): Promise<void> {
    await axios.delete(`${API_URL}/vacina-lotes/${idVacina}/${lote}`);    
}