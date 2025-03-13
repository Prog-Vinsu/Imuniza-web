import axios from "axios";
import { Fabricante } from "../contexts/VacinasContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getFabricantes(): Promise<Fabricante[]> {
    const response = await axios.get(`${API_URL}/fabricantes`);
    return response.data.data;
}

export async function createFabricante(fabricante: Fabricante): Promise<Fabricante> {
    const response = await axios.post(`${API_URL}/fabricantes`, fabricante);
    return response.data.data;
}

export async function updateFabricante(
        cnpjFabricante: string,
        novosDadosFabricante: Fabricante
    ): Promise<Fabricante> {
    const cnpjSemMascara = cnpjFabricante.replace(/\D/g, "");
    const response = await axios.put(`${API_URL}/fabricantes/${cnpjSemMascara}`, novosDadosFabricante);
    return response.data.data;
}

export async function deleteFabricante(cnpjFabricante: string): Promise<void> {
    await axios.delete(`${API_URL}/fabricantes/${cnpjFabricante}`);
}
