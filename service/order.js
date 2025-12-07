import * as SecureStore from 'expo-secure-store';
import api from './api';

async function getAuthToken() {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
}

/**
 * Envia um pedido para o backend
 * @param {{ userId: string|number, restaurantId: string|number, mesa?: string, items: Array<{ menuItemId: string|number, quantity: number, price: number }>, total: number }} payload
 */
export const sendOrder = async (payload) => {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('Pedido inválido: items obrigatórios');
  }

  try {
    const token = await getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await api.post('/orders', payload, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar pedido:', error.response?.data || error.message || error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  if (!orderId) throw new Error('orderId é obrigatório');
  try {
    const token = await getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await api.get(`/orders/${orderId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter pedido:', error.response?.data || error.message || error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  if (!orderId) throw new Error('orderId é obrigatório');
  if (!['pending_payment', 'paid', 'cancelled'].includes(status)) throw new Error('status inválido');
  try {
    const token = await getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await api.put(`/orders/${orderId}/status`, { status }, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error.response?.data || error.message || error);
    throw error;
  }
};

export default {
  sendOrder,
  getOrder,
  updateOrderStatus,
};
