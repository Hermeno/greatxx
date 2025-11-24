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



export const cadastroUsuario  = async ({ nome, email,  senha }) => {
    const tipo = "usuario_final";

    try{
        const response = await api.post('/clientes', {
            nome: nome,
            email: email,
            senha: senha,
            tipo_cliente: tipo,
            nivel_acesso: "A"
        })
        console.log("resposta do backend sobre cadastro", response.data)
        return response;
    } catch (error) {
        throw error;
    }
}




export const loginUsuario = async ({ email, senha }) => {
    try {
        const response = await api.post('/clientes/login', {
            email: email,
            senha: senha,
        });

        if (response.status === 200) {
            const { token, usuario } = response.data;

            console.log("Resposta do login:", { usuario, token });


        try {
            await SecureStore.setItemAsync('token', String(token));
            console.log("Token salvo no SecureStore:", token);
            await SecureStore.setItemAsync('nome', String(usuario?.nome ?? ""));
            await SecureStore.setItemAsync('email', String(usuario?.email ?? ""));
            await SecureStore.setItemAsync('usuarioId', String(usuario?.id ?? ""));
        } catch (error) {
            console.log("Erro ao salvar no SecureStore:", error);
        }


            return response.data;
        } else {
            throw new Error('Falha no login');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};