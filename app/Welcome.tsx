import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// Simulação do hook, substitua pelo seu contexto real
const useOrder = () => {
  return {
    customerName: "João",
    restaurantName: "Great-X",
    tableNumber: "Mesa 5",
  };
};

export default function Welcome() {
  const router = useRouter();
  const { customerName, restaurantName, tableNumber } = useOrder();

  return (
    <View className="flex-1 bg-[#1e1e2f] items-center justify-center p-6">
      {/* Logo GX */}
      <View className="w-32 h-32 rounded-full bg-cyan-400 flex items-center justify-center mb-8">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      {/* Mensagens */}
      <View className="items-center space-y-4 mb-12">
        <Text className="text-white text-xl">Olá {customerName}! Bem Vindo ao</Text>
        <Text className="text-white text-3xl font-bold">{restaurantName}</Text>
        {tableNumber && (
          <Text className="text-cyan-400 text-lg font-semibold">{tableNumber}</Text>
        )}

        <View className="mt-6 bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mx-4">
          <Text className="text-yellow-300 text-lg font-semibold">
            Hoje o Couvert a partir das 20:00 é de 35 Reais.
          </Text>
        </View>

        <Text className="text-white text-lg mt-4">Vamos abrir sua comanda.</Text>
      </View>

      {/* Pulsando */}
      <View className="my-12 items-center justify-center">
        <View className="w-40 h-40 rounded-full bg-cyan-400 items-center justify-center opacity-50" />
      </View>

      {/* Botão */}
      <View className="items-center">
        <Text className="text-gray-300 text-lg mb-4">Aproxime o celular no NFC da entrada</Text>
        <TouchableOpacity
          onPress={() => router.push("/HomeMenu")}
          className="mt-4 px-8 py-3 bg-white/10 border border-white/20 rounded-lg"
        >
          <Text className="text-white text-center">Simular aproximação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
