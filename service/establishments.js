import * as SecureStore from "expo-secure-store";
import api from "./api";

async function getAuthToken() {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

export const getEstablishments = async () => {
    try {
        const token = await getAuthToken();
        console.log("Token obtido para estabelecimentos:", token);
        const response = await api.get('/estabelecimentos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("resposta do backend sobre os estabelecimentos", response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}




export const chooseEstablishment = async ({ cliente_id }) => {
    try {
        const token = await getAuthToken();
        const response = await api.get(`/estabelecimentos`, {
            params: { cliente_id: cliente_id },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("resposta do backend sobre os estabelecimentos", response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// NOW SELECT BY ID 
export const chooseEstablishmentById = async ({ id }) => {
    try {
        const token = await getAuthToken();
        const response = await api.get(`/estabelecimentos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("resposta do backend sobre o estabelecimento por id", response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}