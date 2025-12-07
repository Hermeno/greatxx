import CloseAccountButton from '@/components/CloseAccountButton';
import { getCategorias } from '@/service/categorias';
import { getProdutosByCategoria } from '@/service/produtos';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { useOrder } from '../contexts/OrderContext';

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
  const { id: idParam, slug: slugParam } = useLocalSearchParams<{ id?: string; slug?: string }>();
  const router = useRouter();
  const { addItem, items: cartItems, updateQuantity, removeItem } = useOrder();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'promotions'>('menu');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // load categories to find the id that matches the slug param (fallback)
        const categorias = await getCategorias();
        const slugQuery = (slugParam ?? '').toString();

        // helper to normalize and slugify same as MenuOptions
        const slugify = (s: string) =>
          encodeURIComponent(
            s
              .normalize('NFD')
              .replace(/\p{Diacritic}/gu, '')
              .replace(/[^\w\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .toLowerCase()
          );

        let categoriaId: number | null = null;

        // prefer explicit id param when present
        if (idParam) {
          const parsed = Number(idParam);
          if (!isNaN(parsed)) categoriaId = parsed;
        }

        // otherwise try matching slug (fallback)
        if (categoriaId == null && Array.isArray(categorias)) {
          for (let i = 0; i < categorias.length; i++) {
            const c = categorias[i];
            const rawName = (c.nome ?? c.name ?? '').toString();
            const candidate = slugify(c.slug ?? rawName);
            if (candidate === slugQuery) {
              categoriaId = Number(c.id ?? null);
              break;
            }
          }
        }

        if (categoriaId != null) {
          const produtos = await getProdutosByCategoria(Number(categoriaId));
          if (mounted) {
            const mapped: MenuItem[] = produtos.map((p: any) => ({
              id: p.id,
              name: p.nome ?? p.name ?? 'Produto',
              description: '',
              price: Number(p.preco ?? p.price ?? 0),
              image_url: p.imagem ?? p.foto ?? '',
              is_promotion: !!p.is_promotion,
              category: slugParam ?? (idParam ?? ''),
            }));
            setMenuItems(mapped);
          }
        } else {
          // no category id found
          if (mounted) setMenuItems([]);
        }
      } catch (err) {
        console.warn('Erro ao carregar produtos da categoria', err);
        if (mounted) setMenuItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, [idParam, slugParam]);

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find((i: any) => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleAdd = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  const handleSubtract = (itemId: number) => {
    const currentQty = getItemQuantity(itemId);
    if (currentQty > 1) {
      // decrement quantity
      updateQuantity(itemId, currentQty - 1);
    } else {
      // remove from cart
      removeItem(itemId);
    }
  };


  // Para a aba de promoções
  useEffect(() => {
    if (activeTab === 'promotions') {
      // TODO: Buscar dados de promoções da API
      // const response = await fetchPromotions(restaurantId);
      setMenuItems([]);
    }
  }, [activeTab]);

  const filteredItems = activeTab === 'promotions'
    ? menuItems.filter((item: MenuItem) => item.is_promotion)
    : menuItems.filter((item: MenuItem) => !item.is_promotion);

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
          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#34d399" />
              <Text className="text-gray-400 mt-2">Carregando pratos...</Text>
            </View>
          ) : filteredItems.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-gray-400">Nenhum item encontrado nesta categoria.</Text>
            </View>
          ) : (
            filteredItems.map((item) => (
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
                    <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1">
                      <TouchableOpacity
                        onPress={() => handleSubtract(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        <Text className="text-gray-700 text-lg">-</Text>
                      </TouchableOpacity>

                      <Text className="text-gray-900 font-semibold w-10 text-center">{getItemQuantity(item.id)}</Text>

                      <TouchableOpacity
                        onPress={() => handleAdd(item)}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
                      >
                        <Text className="text-gray-900  text-lg">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View className="bottom-0 left-0 right-0 p-6 mb-2 bg-[#111111] border-t border-gray-800">
          <TouchableOpacity onPress={() => router.push('/OrderSummary')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999, marginBottom: 8 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER MEU PEDIDO</Text>
            </LinearGradient>
          </TouchableOpacity>
        <CloseAccountButton />
      </View>
    </View>
  );
}
