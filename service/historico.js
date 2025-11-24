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


// this page is for historicoRelatorio model historico_Relatorio {
// model historico_relatorios {
//   id            Int      @id @default(autoincrement())
//   cliente_id    Int?
//   tipo_relatorio String?
//   parametros    String?
//   data_execucao DateTime @default(now())
//   cliente       clientes? @relation(fields: [cliente_id], references: [id])
// }

export const getHistoricoRelatorio = async () => {
    try {
        const token = await getAuthToken();
        const response = await api.get('/historico/relatorio', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addHistoricoBeneficio = async ({ beneficio }) => {
    try {
        const token = await getAuthToken();
        const response = await api.post('/historico/relatorio', {
            beneficio: beneficio,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}   
export const clearHistoricoRelatorio = async () => {
    try {
        const token = await getAuthToken();
        const response = await api.delete('/historico/relatorio', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}