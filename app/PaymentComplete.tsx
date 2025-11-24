import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PaymentComplete() {
  const router = useRouter();
  const { clearOrder } = useOrder();

  const handleBackToStart = () => {
    clearOrder();
    router.push('/ChooseRestaurant');
  };

  return (
    <View className="flex-1 bg-[#0B1A2A] items-center justify-center p-6">
      {/* GX Logo Top */}
      <View className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 items-center justify-center mb-12">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      {/* Success Circle */}
      <View className="w-40 h-40 rounded-full bg-green-500 items-center justify-center mb-8">
        <Text className="text-white text-6xl font-bold">✓</Text>
      </View>

      {/* Text Info */}
      <View className="items-center mb-12 space-y-3">
        <Text className="text-white text-3xl font-bold">Pago com sucesso</Text>
        <Text className="text-white text-xl">Agradecemos sua presença</Text>
        <Text className="text-white text-xl">Volte sempre!</Text>
      </View>

      {/* GX Logo Bottom */}
      <View className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 items-center justify-center mb-8">
        <Text className="text-white text-2xl font-bold">GX</Text>
      </View>

      {/* NFC Info */}
      <View className="flex-row items-center gap-2 mb-12">
        <Text className="text-white text-lg">🌊</Text>
        <Text className="text-white text-lg">Aproxime na saída para liberação!</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBackToStart}
        className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg items-center justify-center"
      >
        <Text className="text-white text-lg">Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}
