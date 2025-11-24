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

export const getProdutosByCategoria = async (categoriaId: number) => {
  try {
    const token = await getAuthToken();
    const response = await api.get(`/produtos/categoria/${categoriaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return (response.data || []).map((p: any) => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      qtd: p.qtd ?? 0,
      imagem: p.foto || 'https://via.placeholder.com/100',
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};



