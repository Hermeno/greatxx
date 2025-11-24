import CloseAccountButton from '@/components/CloseAccountButton';
import GradientButton from '@/components/GradientButton';
import Header from '@/components/Header';
import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export default function Promotions() {
  const router = useRouter();
  const { restaurantId, addItem, updateQuantity, items } = useOrder();
  const [promotionItems, setPromotionItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (restaurantId) {
      fetch(`/api/promotions-items/${restaurantId}`)
        .then(res => res.json())
        .then(data => setPromotionItems(data.items || []));
    }
  }, [restaurantId]);

  const getItemQuantity = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleAdd = (item: MenuItem) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 0) {
      updateQuantity(item.id, currentQty + 1);
    } else {
      addItem({ id: item.id, name: item.name, quantity: 1, price: item.price });
    }
  };

  const handleSubtract = (itemId: number) => {
    const currentQty = getItemQuantity(itemId);
    if (currentQty > 0) {
      updateQuantity(itemId, currentQty - 1);
    }
  };

  return (
    <View className="flex-1 bg-[#111111]">
      <Header />

      <ScrollView contentContainerStyle={{ paddingTop: 24, paddingBottom: 120, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-6"
        >
          <Text className="text-white text-lg">{'<'} Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold text-center mb-8">
          Promoções do Dia
        </Text>

        {promotionItems.length === 0 ? (
          <View className="bg-gray-800 rounded-2xl p-8 mb-4">
            <Text className="text-gray-400 text-center">Nenhuma promoção disponível no momento</Text>
          </View>
        ) : (
          promotionItems.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl p-4 mb-4 border-2 border-pink-500 shadow-lg">
              <View className="flex-row gap-4">
                <Image
                  source={{ uri: item.image_url }}
                  className="w-24 h-24 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1 items-start">
                    <Text className="text-gray-900 font-bold text-lg">{item.name}</Text>
                    <Text className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      PROMO
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-600 mb-2">{item.category}</Text>
                  <Text className="text-xl font-bold text-pink-600 mt-1">
                    R$ {item.price.toFixed(2)}
                  </Text>

                  <View className="flex-row items-center gap-3 mt-3">
                    <Text className="text-gray-600 text-sm">Qtd</Text>
                    <TouchableOpacity
                      onPress={() => handleSubtract(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
                    >
                      <Text className="text-gray-700">-</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-900 font-semibold w-8 text-center">
                      {getItemQuantity(item.id)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAdd(item)}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 items-center justify-center"
                    >
                      <Text className="text-white">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-[#111111] border-t border-gray-800">
        <View className="space-y-3">
          <GradientButton onPress={() => router.push('/OrderSummary')}>
            VER MEU PEDIDO
          </GradientButton>
          <CloseAccountButton onPress={() => router.push('/fechamento')} />
        </View>
      </View>
    </View>
  );
}
