import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CashierPayment() {
  const router = useRouter();

  const handleSimulateApproach = () => {
    router.push('/PaymentComplete');
  };
 
  return (
    <View className="flex-1 bg-gradient-to-b from-blue-900 to-black items-center justify-center p-6">
      <View className="w-32 h-32 rounded-full bg-cyan-400 flex items-center justify-center mb-8">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      <View className="my-12 relative">
        <View className="w-40 h-40 rounded-full bg-cyan-400 from-cyan-100 to-blue-500 items-center justify-center flex animate-pulse">
          <FontAwesome name="money" size={30} color="white" />
        </View>
        <View className="absolute inset-0 rounded-full bg-cyan-400 from-cyan-400 to-blue-500 animate-ping opacity-20"></View>
      </View>
{/* 
            <View className="w-32 h-32 rounded-full bg-cyan-400 flex items-center justify-center mb-8">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View> */}

      <View className="items-center mb-12 w-full mb-6 py-4 px-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-400 items-center justify-center">
        <Text className="text-white text-xl mb-4 text-center">
          Sua conta já foi enviada ao caixa
        </Text>
        <View className="flex-row items-center justify-center gap-2 mb-6">
          {/* <Text className="text-white text-xl">🌊</Text> */}
          <Text className="text-lg text-gray-300">
            Aproxime seu celular na máquina para fechar
          </Text>
        </View>
      </View>

       <View className="w-20 h-20 rounded-full bg-cyan-400 flex items-center justify-center mb-8">
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
