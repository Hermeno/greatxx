import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useOrder } from '../contexts/OrderContext';

export default function ConfirmOrder() {
  const router = useRouter();
  const { items, restaurantId } = useOrder();
  const [confirmed, setConfirmed] = useState(false);
  const [destination, setDestination] = useState<'cozinha' | 'bar' | 'ambos'>('ambos');

  useEffect(() => {
    const checkDestination = async () => {
      if (items.length === 0) return;

      try {
        const itemIds = items.map(item => item.id);
        const response = await fetch(`/api/menu-items-by-ids`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: itemIds, restaurantId })
        });

        const data = await response.json();
        const categories = data.items?.map((item: any) => item.category) || [];

        const foodCategories = ['Porções', 'Pratos'];
        const drinkCategories = ['Cervejas', 'Drinks', 'Drinks sem Álcool', 'Drinks s/ Álcool'];

        const hasFood = categories.some((cat: string) => foodCategories.includes(cat));
        const hasDrinks = categories.some((cat: string) => drinkCategories.includes(cat));

        if (hasFood && hasDrinks) setDestination('ambos');
        else if (hasFood) setDestination('cozinha');
        else if (hasDrinks) setDestination('bar');
      } catch (error) {
        console.error('Erro ao verificar categorias:', error);
      }
    };

    checkDestination();
  }, [items, restaurantId]);

  const handleSimulateApproach = async () => {
    setConfirmed(true);

    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantId,
        customerName: 'Fernando',
        sessionId: Date.now().toString(),
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: items.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      })
    });

    setTimeout(() => {
      router.push('/MenuItems');
    }, 3000);
  };

  const getDestinationMessage = () => {
    switch (destination) {
      case 'bar': return 'Pedido enviado ao bar 🍺';
      case 'cozinha': return 'Pedido enviado à cozinha 👩‍🍳';
      case 'ambos': return 'Pedido enviado 🍽️';
      default: return 'Pedido enviado';
    }
  };

  if (confirmed) {
    return (
      <View className="flex-1 items-center justify-center bg-green-900 p-6">
        <View className="w-32 h-32 rounded-full bg-green-400 items-center justify-center mb-12">
          <Text className="text-white text-5xl">✅</Text>
        </View>

        <Text className="text-white text-3xl font-bold mb-4">Pedido Confirmado!</Text>
        <Text className="text-green-300 text-xl mb-2">{getDestinationMessage()}</Text>
        <Text className="text-gray-400 text-center">Seu pedido será preparado em breve</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-blue-900 p-6">
      <View className="w-28 h-28 mb-3 rounded-full bg-green-500 flex items-center justify-center mr-2">
          <Text className="text-white font-bold text-sm">GX</Text>
      </View>

      <View className="my-12 items-center">
        <View className="w-40 h-40 rounded-full bg-cyan-400 items-center justify-center mb-2">
          <Text className="text-white text-6xl">🌊</Text>
        </View>
      </View>

      <Text className="text-white text-xl text-center mb-8">
        Aproxime na máquina para{'\n'}confirmar seu pedido
      </Text>
      <View className="w-16 h-16 mb-3 rounded-full bg-green-500 flex items-center justify-center mr-2">
          <Text className="text-white font-bold text-sm">GX</Text>
      </View>

      <TouchableOpacity
        onPress={handleSimulateApproach}
        className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg"
      >
        <Text className="text-white text-center">Simular aproximação</Text>
      </TouchableOpacity>
    </View>
  );
}
