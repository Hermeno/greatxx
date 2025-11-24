import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

export default function NFCPayment() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleSimulateApproach = () => {
    router.push('/pagamento-concluido');
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-900 to-black items-center justify-center p-6">
      <View className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 flex items-center justify-center mb-12">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      <View className="my-12 items-center justify-center">
        <Animated.View
          style={{ transform: [{ scale: pulseAnim }] }}
          className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 items-center justify-center"
        >
          <Text className="text-white text-4xl font-bold">💳</Text>
        </Animated.View>
        <View className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20" />
      </View>

      <View className="items-center mb-12">
        <Text className="text-white text-2xl mb-4">Aproxime seu cartão de</Text>
        <Text className="text-white text-2xl font-bold mb-6">Débito ou Crédito</Text>
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-white text-lg">🌊</Text>
          <Text className="text-lg text-gray-300">Use o NFC do seu celular</Text>
        </View>
      </View>

      <View className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 items-center justify-center mb-12">
        <Text className="text-white font-bold text-2xl">GX</Text>
      </View>

      <TouchableOpacity
        onPress={handleSimulateApproach}
        className="mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-lg items-center"
      >
        <Text className="text-white text-center">Simular aproximação</Text>
      </TouchableOpacity>
    </View>
  );
}
