import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import AlertModal from "@/components/AlertModal";
import GradientButton from "@/components/GradientButton";
import Header from "@/components/Header";
import { useOrder } from "@/contexts/OrderContext";

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
  const { customerName, orderHistory, isSessionActive, getSessionDurationMinutes } = useOrder();
  const [showAlert, setShowAlert] = useState(false);

  const COUVERT_PRICE = 35.0;
  const COUVERT_TIME_THRESHOLD = 1;

  const shouldChargeCouvert = () => {
    return getSessionDurationMinutes() > COUVERT_TIME_THRESHOLD;
  };

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

  const handleBackClick = () => {
    router.push("/HomeMenu");
  };

  return (
    <View className="flex-1 bg-[#111111]">
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="Comanda Aberta"
        message="Você precisa fechar sua comanda antes de sair. Use o botão 'FECHAR CONTA' abaixo."
      />

      <Header />

      <ScrollView className="pt-24 pb-8 px-6">
        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={handleBackClick}
          className="flex-row items-center gap-2 mb-6"
        >
          <ArrowLeft size={22} color="white" />
          <Text className="text-white text-base">Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-8">Histórico</Text>

        <Text className="text-gray-400 mb-6">
          Olá {customerName}, aqui estão seus pedidos:
        </Text>

        {/* SEM PEDIDOS */}
        {orderHistory.length === 0 && !shouldChargeCouvert() ? (
          <View className="bg-gray-800 rounded-2xl p-8 mb-8">
            <Text className="text-gray-400 text-center">
              Nenhum pedido realizado ainda
            </Text>
          </View>
        ) : (
          <View className="space-y-4 mb-8">
            {orderHistory.map((order: Order) => (
              <View
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-lg"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-gray-900 font-bold text-lg">
                      Pedido #{order.id}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {formatDateTime(order.created_at)}
                    </Text>
                  </View>

                  <Text className="text-xl font-bold text-gray-900">
                    R$ {order.total.toFixed(2)}
                  </Text>
                </View>

                <View className="pt-3 border-t border-gray-200 space-y-2">
                  {order.items?.map((item: any, idx: number) => (
                    <View
                      key={idx}
                      className="flex-row justify-between text-sm"
                    >
                      <Text className="text-gray-700">
                        {item.quantity}x {item.name}
                      </Text>
                      <Text className="text-gray-900 font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* COUVERT */}
            {shouldChargeCouvert() && (
              <View className="bg-yellow-500/10 border-2 border-yellow-500 rounded-2xl p-4 shadow-lg">
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-yellow-700 font-bold text-lg">
                      Couvert
                    </Text>
                    <Text className="text-yellow-600 text-sm">
                      Cobrado após 1 minuto
                    </Text>
                  </View>

                  <Text className="text-xl font-bold text-yellow-700">
                    R$ {COUVERT_PRICE.toFixed(2)}
                  </Text>
                </View>

                <View className="pt-3 border-t border-yellow-500/30">
                  <View className="flex-row justify-between text-sm">
                    <Text className="text-yellow-700">1x Couvert</Text>
                    <Text className="text-yellow-700 font-medium">
                      R$ {COUVERT_PRICE.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        <GradientButton onPress={() => router.push("/HomeMenu")}>
          VOLTAR
        </GradientButton>
      </ScrollView>
    </View>
  );
}
