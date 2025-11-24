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



// this page is for received 6 code

export const receivedCode = async ({ email }) => {
    try {
        const response = await api.post('/auth/recuperar-senha', {
            email: email,
        });
        console.log("resposta do backend sobre o envio do código", response.data)
        return response;
    } catch (error) {
        throw error;
    }
}   