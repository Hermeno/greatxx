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




export const criarPedido = async (carrinho = []) => {
  if (!Array.isArray(carrinho) || carrinho.length === 0) {
    throw new Error("Carrinho inválido ou vazio");
  }

  // Monta o formato que o backend espera
  const itensPedido = carrinho.map(item => ({
    produto_id: item.produto.id,
    quantidade: item.qtd
  }));

  const total = carrinho.reduce(
    (acc, item) => acc + (Number(item.produto.preco ?? 0) * item.qtd),
    0
  );

  const data = { itensPedido, total };

  try {
    const token = await getAuthToken();
    const response = await api.post("/pedidos", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Pedido criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error.response?.data || error);
    throw error;
  }
};



export const listarPedidos = async () => {
  try {
    const token = await getAuthToken();
    const response = await api.get("/pedidos", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Pedidos listados com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error.response?.data || error);
    throw error;
  }
};

export const obterDetalhesPedido = async (pedidoId) => {
  if (!pedidoId) {
    throw new Error("ID do pedido é obrigatório");
  }

  try {
    const token = await getAuthToken();
    const response = await api.get(`/pedidos/${pedidoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Detalhes do pedido obtidos com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter detalhes do pedido:", error.response?.data || error);
    throw error;
  }
};