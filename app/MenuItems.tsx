import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_promotion: boolean;
  category: string;
}

export default function MenuItems() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  // Simulando contexto de pedidos
  const restaurantId = 1; // exemplo
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'promotions'>('menu');
  const [items, setItems] = useState<{ id: number; name: string; quantity: number; price: number }[]>([]);

  useEffect(() => {
    if (restaurantId) {
      fetch(`/api/menu/${restaurantId}/${category}`)
        .then(res => res.json())
        .then(data => setMenuItems(data.items || []));
    }
  }, [restaurantId, category]);

  const getItemQuantity = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleAdd = (item: MenuItem) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 0) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setItems(prev => [...prev, { id: item.id, name: item.name, quantity: 1, price: item.price }]);
    }
  };

  const handleSubtract = (itemId: number) => {
    const currentQty = getItemQuantity(itemId);
    if (currentQty > 0) {
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  // Para a aba de promoções
  useEffect(() => {
    if (activeTab === 'promotions' && restaurantId) {
      fetch(`/api/promotions-items/${restaurantId}`)
        .then(res => res.json())
        .then(data => {
          const categoryPromotions = data.items?.filter((item: MenuItem) => item.category === category) || [];
          setMenuItems(prev => {
            const allItems = [...prev];
            categoryPromotions.forEach((promoItem: MenuItem) => {
              const existingIndex = allItems.findIndex(i => i.id === promoItem.id);
              if (existingIndex >= 0) {
                allItems[existingIndex] = { ...promoItem, is_promotion: true };
              } else {
                allItems.push({ ...promoItem, is_promotion: true });
              }
            });
            return allItems;
          });
        });
    }
  }, [activeTab, restaurantId, category]);

  const filteredItems = activeTab === 'promotions' 
    ? menuItems.filter(item => item.is_promotion)
    : menuItems.filter(item => !item.is_promotion || activeTab === 'menu');

  return (
    <View className="flex-1 bg-[#111111]">
      {/* Header placeholder */}
      <Header />
      <View className="h-16" />

      <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Text className="text-white text-lg">⬅️</Text>
          <Text className="text-white text-lg">Voltar</Text>
        </TouchableOpacity>

        <View className="flex-row gap-4 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab('menu')}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'menu' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500' : 'bg-gray-800'
            }`}
          >
            <Text className={`font-semibold ${activeTab === 'menu' ? 'text-white' : 'text-gray-400'}`}>Cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('promotions')}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'promotions' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500' : 'bg-gray-800'
            }`}
          >
            <Text className={`font-semibold ${activeTab === 'promotions' ? 'text-white' : 'text-gray-400'}`}>Promoções do dia</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          {filteredItems.map((item) => (
            <View key={item.id} className="bg-white mt-2 rounded-2xl p-4 shadow-lg flex-row gap-4">
              <Image 
                source={{ uri: item.image_url }}
                className="w-24 h-24 rounded-lg"
              />
              <View className="flex-1 justify-between">
                <Text className="text-gray-900 font-bold text-lg">{item.name}</Text>
                <Text className="text-xl font-bold text-gray-900 mt-1">R$ {item.price.toFixed(2)}</Text>
                <View className="flex-row items-center gap-3 mt-3">
                  <Text className="text-gray-600 text-sm">Qtd</Text>
                  <TouchableOpacity
                    onPress={() => handleSubtract(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <Text className="text-gray-700 text-lg">-</Text>
                  </TouchableOpacity>
                  <Text className="text-gray-900 font-semibold w-8 text-center">{getItemQuantity(item.id)}</Text>
                  <TouchableOpacity
                    onPress={() => handleAdd(item)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
                  >
                    <Text className="text-white text-lg">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-[#111111] border-t border-gray-800">
        <TouchableOpacity
          onPress={() => router.push('/OrderSummary')}
          className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 items-center mb-3"
        >
          <Text className="text-white font-semibold text-lg">VER MEU PEDIDO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/fechamento')}
          className="w-full py-4 rounded-full bg-red-600 items-center"
        >
          <Text className="text-white font-semibold text-lg">FECHAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
