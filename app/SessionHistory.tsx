import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import GradientButton from "@/components/GradientButton";


// Simulação do hook, substitua pelo seu contexto real
const useOrder = () => {
  return {
    customerName: "João",
    restaurantId: 1,
    sessionId: 1,
  };
};

interface Order {
  id: number;
  created_at: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function SessionHistory() {
  const router = useRouter();
  const { customerName, restaurantId, sessionId } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (restaurantId && sessionId) {
      fetch(`https://seu-backend.com/api/session-orders/${restaurantId}/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []));
    }
  }, [restaurantId, sessionId]);

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View className="flex-1 bg-[#111111]">
      <Header />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-6"
        >
          <Text className="text-white text-lg">← Voltar</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text className="text-white text-3xl font-bold mb-4">Histórico</Text>
        <Text className="text-gray-400 mb-6">
          Olá {customerName}, aqui estão seus pedidos:
        </Text>

        {/* Lista de pedidos */}
        {orders.length === 0 ? (
          <View className="bg-gray-800 rounded-2xl p-6 mb-8">
            <Text className="text-gray-400 text-center">Nenhum pedido realizado ainda</Text>
          </View>
        ) : (
          <View className="space-y-4 mb-8">
            {orders.map((order) => (
              <View key={order.id} className="bg-white rounded-2xl p-4 shadow">
                <View className="flex-row justify-between mb-3">
                  <View>
                    <Text className="text-gray-900 font-bold text-lg">
                      Pedido #{order.id}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {formatDateTime(order.created_at)}
                    </Text>
                  </View>
                  <Text className="text-gray-900 font-bold text-xl">
                    R$ {order.total.toFixed(2)}
                  </Text>
                </View>

                <View className="border-t border-gray-200 pt-3 space-y-2">
                  {order.items?.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between">
                      <Text className="text-gray-700 text-sm">
                        {item.quantity}x {item.name}
                      </Text>
                      <Text className="text-gray-900 font-medium text-sm">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Botão voltar */}
        <TouchableOpacity
          onPress={() => router.push("/HomeMenu")}
          className="bg-yellow-500 rounded-lg py-3 mt-4 items-center"
        >
          <Text className="text-white font-bold">VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
