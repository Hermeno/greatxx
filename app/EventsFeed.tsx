import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useOrder } from '../contexts/OrderContext';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  image_url: string;
  event_type: string;
}

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount_text: string;
  valid_until: string;
  image_url: string;
}

interface Restaurant {
  address: string;
}

export default function EventsFeed() {
  const router = useRouter();
  const { restaurantId, restaurantName } = useOrder();
  const [events, setEvents] = useState<Event[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeTab, setActiveTab] = useState<'dia' | 'semana' | 'promocoes'>('dia');

  useEffect(() => {
    if (restaurantId) {
      fetch(`/api/events/${restaurantId}`)
        .then(res => res.json())
        .then(data => setEvents(data.events || []));

      fetch(`/api/promotions/${restaurantId}`)
        .then(res => res.json())
        .then(data => setPromotions(data.promotions || []));

      fetch(`/api/restaurant/${restaurantId}`)
        .then(res => res.json())
        .then(data => setRestaurant(data.restaurant || null));
    }
  }, [restaurantId]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

  const isToday = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const isThisWeek = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= weekFromNow;
  };

  const todayEvents = events.filter(e => isToday(e.event_date));
  const weekEvents = events.filter(e => isThisWeek(e.event_date));

  const handleOpenMaps = () => {
    if (restaurant?.address) {
      const encodedAddress = encodeURIComponent(restaurant.address);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
    }
  };

  return (
    <ScrollView className="bg-[#111111] flex-1">
      <Header />
      
      <View className="pt-24 px-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-white">← Voltar</Text>
        </TouchableOpacity>

        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 items-center justify-center mb-2">
            <Text className="text-white font-bold text-2xl">GX</Text>
          </View>
          <Text className="text-white text-3xl font-bold">{restaurantName}</Text>
          <Text className="text-gray-400">Fique por dentro da nossa programação</Text>
        </View>

        {/* Como Chegar ao Bar */}
        {restaurant?.address && (
          <View className="bg-blue-800 rounded-2xl p-4 mb-6">
            <Text className="text-white font-bold text-lg">Como Chegar ao Bar</Text>
            <Text className="text-blue-200 mt-1">{restaurant.address}</Text>
            <TouchableOpacity 
              onPress={handleOpenMaps} 
              className="bg-cyan-400 mt-2 p-2 rounded"
            >
              <Text className="text-white text-center">Abrir no Maps</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tabs */}
        <View className="flex-row gap-2 mb-4">
          {['dia', 'semana', 'promocoes'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? 'bg-cyan-500' : 'bg-gray-800'}`}
            >
              <Text className="text-white font-semibold">{tab === 'dia' ? 'Dia' : tab === 'semana' ? 'Semana' : 'Promoções'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo */}
        {activeTab === 'dia' && (
          todayEvents.length === 0 ? (
            <View className="bg-gray-800 rounded-2xl p-4 items-center">
              <Text className="text-gray-400">Nenhum evento hoje</Text>
            </View>
          ) : (
            todayEvents.map(event => (
              <View key={event.id} className="bg-gray-800 rounded-2xl mb-4 p-4">
                {event.image_url && (
                  <Image source={{ uri: event.image_url }} className="w-full h-48 rounded" />
                )}
                <Text className="text-white font-bold text-lg mt-2">{event.title}</Text>
                <Text className="text-gray-300 text-sm">{getDayOfWeek(event.event_date)} - {event.event_time}</Text>
                <Text className="text-gray-400 text-sm">{formatDate(event.event_date)}</Text>
                {event.description && <Text className="text-gray-400 text-sm mt-1">{event.description}</Text>}
              </View>
            ))
          )
        )}

        {activeTab === 'semana' && (
          weekEvents.length === 0 ? (
            <View className="bg-gray-800 rounded-2xl p-4 items-center">
              <Text className="text-gray-400">Nenhum evento nesta semana</Text>
            </View>
          ) : (
            weekEvents.map(event => (
              <View key={event.id} className="bg-gray-800 rounded-2xl mb-4 p-4">
                {event.image_url && (
                  <Image source={{ uri: event.image_url }} className="w-full h-48 rounded" />
                )}
                <Text className="text-white font-bold text-lg mt-2">{event.title}</Text>
                <Text className="text-gray-300 text-sm">{getDayOfWeek(event.event_date)} - {event.event_time}</Text>
                <Text className="text-gray-400 text-sm">{formatDate(event.event_date)}</Text>
                {event.description && <Text className="text-gray-400 text-sm mt-1">{event.description}</Text>}
              </View>
            ))
          )
        )}

        {activeTab === 'promocoes' && (
          promotions.length === 0 ? (
            <View className="bg-gray-800 rounded-2xl p-4 items-center">
              <Text className="text-gray-400">Nenhuma promoção disponível no momento</Text>
            </View>
          ) : (
            promotions.map(promo => (
              <View key={promo.id} className="bg-red-900 rounded-2xl mb-4 p-4">
                {promo.image_url && (
                  <Image source={{ uri: promo.image_url }} className="w-full h-48 rounded" />
                )}
                <Text className="text-white font-bold text-lg mt-2">{promo.title}</Text>
                {promo.description && <Text className="text-red-100 text-sm">{promo.description}</Text>}
                <Text className="text-red-300 text-sm">Válido até {formatDate(promo.valid_until)}</Text>
              </View>
            ))
          )
        )}
      </View>
    </ScrollView>
  );
}
