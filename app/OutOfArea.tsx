import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function OutOfArea() {
  const router = useRouter();
  const { customerName, restaurantName } = useOrder();

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-900 to-blue-950 items-center justify-center p-6">
      {/* GX Logo */}
      <View className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 items-center justify-center mb-8">
        <Text className="text-white font-bold text-4xl">GX</Text>
      </View>

      {/* Text Content */}
      <View className="items-center space-y-4 mb-12">
        <Text className="text-white text-xl">Olá {customerName}!</Text>
        <Text className="text-white text-3xl font-bold">{restaurantName}</Text>
        <Text className="text-white text-lg mt-6 text-center">
          Você está a mais de 100 metros do estabelecimento.
        </Text>
        <Text className="text-white text-lg text-center">
          Precisa se aproximar do bar para abrir sua comanda.
        </Text>
      </View>

      {/* Buttons */}
      <View className="w-full max-w-md space-y-4">
        <TouchableOpacity
          onPress={() => router.push('/ChooseRestaurant')}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 items-center justify-center shadow-lg"
        >
          <Text className="text-white font-semibold text-lg text-center">
            IR ATÉ O BAR PARA ABRIR COMANDA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/EventsFeed')}
          className="w-full py-4 px-6 rounded-full bg-blue-400 items-center justify-center shadow-lg"
        >
          <Text className="text-white font-semibold text-lg text-center">
            VER PROGRAMAÇÃO E PROMOÇÕES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
