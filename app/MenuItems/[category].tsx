import { useOrder } from '@/contexts/OrderContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

  // Simulando contexto de pedidos e dados mockados
  const [activeTab, setActiveTab] = useState<'menu' | 'promotions'>('menu');
  const { items, addItem, updateQuantity } = useOrder();

  // Dados mockados para visualização
  const mockMenuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Batata Frita',
      description: 'Porção de batata frita crocante',
      price: 22.9,
      image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      is_promotion: false,
      category: 'Porções',
    },
    {
      id: 2,
      name: 'Picanha na Chapa',
      description: 'Picanha suculenta servida na chapa',
      price: 59.9,
      image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
      is_promotion: true,
      category: 'Pratos',
    },
    {
      id: 3,
      name: 'Caipirinha',
      description: 'Caipirinha tradicional de limão',
      price: 14.0,
      image_url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
      is_promotion: false,
      category: 'Drinks',
    },
    {
      id: 4,
      name: 'Promoção Chopp',
      description: 'Chopp em dobro até as 20h',
      price: 9.0,
      image_url: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
      is_promotion: true,
      category: 'Cervejas',
    },
    {
      id: 5,
      name: 'Asas de Frango',
      description: 'Asas de frango apimentadas',
      price: 29.9,
      image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
      is_promotion: true,
      category: 'Porções',
    },
    {
      id: 6,
      name: 'Margarita',
      description: 'Cocktail clássico de Margarita',
      price: 18.5,
      image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      is_promotion: false,
      category: 'Drinks',
    },  
    
  ];

  // Filtra por categoria e promoção
  const menuItems = mockMenuItems.filter(item => item.category === category);
  const promotionItems = mockMenuItems.filter(item => item.is_promotion && item.category === category);

  const getItemQuantity = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleAdd = (item: MenuItem) => {
    addItem({ id: item.id, name: item.name, quantity: 1, price: item.price });
  };

  const handleSubtract = (itemId: number) => {
    const currentQty = getItemQuantity(itemId);
    if (currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    } else if (currentQty === 1) {
      updateQuantity(itemId, 0); // remove item
    }
  };

  const filteredItems = activeTab === 'promotions' ? promotionItems : menuItems;

  return (
    <View className="flex-1 bg-[#111111]">
      {/* Header placeholder */}
      <View className="h-16" />

      <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Text className="text-white text-lg">⬅️</Text>
          <Text className="text-white text-lg">Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold text-center mb-8">
          {category}
        </Text>

        {/* Tabs */}
        <View className="flex-row mb-6 bg-gray-900 rounded-lg p-1">
          {activeTab === 'menu' ? (
            <LinearGradient
              colors={["#06b6d4", "#3b82f6"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ flex: 1, borderRadius: 12 }}
            >
              <TouchableOpacity
                onPress={() => setActiveTab('menu')}
                style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 }}
                activeOpacity={0.85}
              >
                <Text className="font-semibold text-white">Cardápio</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <TouchableOpacity
              onPress={() => setActiveTab('menu')}
              style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: '#27272a' }}
              activeOpacity={0.85}
            >
              <Text className="font-semibold text-gray-400">Cardápio</Text>
            </TouchableOpacity>
          )}

          {activeTab === 'promotions' ? (
            <LinearGradient
              colors={["#06b6d4", "#3b82f6"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ flex: 1, borderRadius: 12 }}
            >
              <TouchableOpacity
                onPress={() => setActiveTab('promotions')}
                style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 }}
                activeOpacity={0.85}
              >
                <Text className="font-semibold text-white">Promoções do dia</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <TouchableOpacity
              onPress={() => setActiveTab('promotions')}
              style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: '#27272a' }}
              activeOpacity={0.85}
            >
              <Text className="font-semibold text-gray-400">Promoções do dia</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="space-y-4 ">
          {filteredItems.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl p-4 shadow-lg flex-row gap-4 mt-2">
              <Image 
                source={{ uri: item.image_url }}
                className="w-24 h-24 rounded-lg"
              />
              <View className="flex-1 justify-between">
                <Text className="text-gray-900 font-bold text-lg mb-1">{item.name}</Text>
                <Text className="text-gray-700 mb-2">{item.description}</Text>
                <Text className="text-cyan-600 font-bold text-lg mb-2">R$ {item.price.toFixed(2)}</Text>
                <View className="flex-row items-center gap-2">
                  <TouchableOpacity
                    onPress={() => handleSubtract(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
                  >
                    <Text className="text-gray-700 text-xl">-</Text>
                  </TouchableOpacity>
                  <Text className="text-gray-900 font-semibold text-lg">{getItemQuantity(item.id)}</Text>
                  <TouchableOpacity
                    onPress={() => handleAdd(item)}
                    className="w-8 h-8 rounded-full bg-cyan-500 items-center justify-center"
                  >
                    <Text className="text-white text-xl">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-[#111111] border-t border-gray-800">



          <TouchableOpacity onPress={() => router.push('/OrderSummary')} activeOpacity={0.85} style={{ marginBottom: 12 }}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER MEU PEDIDO</Text>
            </LinearGradient>
          </TouchableOpacity>






        <TouchableOpacity
          onPress={() => router.push('/Checkout')}
          className="w-full py-4 rounded-full bg-red-600 items-center"
        >
          <Text className="text-white font-semibold text-lg">FECHAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
