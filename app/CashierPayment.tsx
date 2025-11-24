import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CashierPayment() {
  const router = useRouter();

  const handleSimulateApproach = () => {
    router.push('/PaymentComplete');
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-900 to-black items-center justify-center p-6">
      <View className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 items-center justify-center mb-12 flex">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      <View className="my-12 relative">
        <View className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 items-center justify-center flex animate-pulse">
          <Text className="text-white text-5xl">💵</Text>
        </View>
        <View className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 animate-ping opacity-20"></View>
      </View>

      <View className="items-center mb-12">
        <Text className="text-white text-xl mb-4 text-center">
          Sua conta já foi enviada ao caixa
        </Text>
        <View className="flex-row items-center justify-center gap-2 mb-6">
          <Text className="text-white text-xl">🌊</Text>
          <Text className="text-lg text-gray-300">
            Aproxime seu celular na máquina para fechar
          </Text>
        </View>
      </View>

      <View className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 items-center justify-center flex mb-12">
        <Text className="text-white font-bold text-2xl">GX</Text>
      </View>

      <TouchableOpacity
        onPress={handleSimulateApproach}
        className="mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-lg items-center justify-center"
      >
        <Text className="text-white">Simular aproximação</Text>
      </TouchableOpacity>
    </View>
  );
}
