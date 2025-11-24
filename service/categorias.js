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

// Buscar todas as categorias
export const getCategorias = async () => {
  try {
    const token = await getAuthToken();
    const response = await api.get("/categorias", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

export const getCategoriaById = async (id: number) => {
  try {
    const token = await getAuthToken();
    const response = await api.get(`/categorias/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const categoria = response.data;

    if (Array.isArray(categoria.produtos)) {
      categoria.produtos = categoria.produtos.map((p: any) => ({
        id: p.id,
        nome: p.nome,
        preco: p.preco,
        qtd: p.qtd ?? 0, 
        imagem: p.foto || "https://via.placeholder.com/100", 
      }));
    } else {
      categoria.produtos = [];
    }

    return categoria;
  } catch (error) {
    console.error("Erro ao buscar categoria por ID:", error);
    return { produtos: [] };
  }
};