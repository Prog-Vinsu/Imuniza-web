import axios from "axios";
import { Morador } from "../contexts/MoradoresContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getMoradores(): Promise<Morador[]> {
    const response = await axios.get(`${API_URL}/moradores`)
    return response.data.data
}

export async function createMorador(morador: Morador): Promise<Morador> {
    const response = await axios.post(`${API_URL}/moradores`, morador)
    return response.data.data
}

export async function updateMorador(
    cpfMorador: string,
    novosDadosMorador: Morador
    ): Promise<Morador> {
    const response = await axios.put (`${API_URL}/moradores/${cpfMorador}`, novosDadosMorador)
    return response.data.data
}

export async function deleteMorador(cpfMorador: string): Promise<void> {
    await axios.delete(`${API_URL}/moradores/${cpfMorador}`)
}
