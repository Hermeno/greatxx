import { useOrder } from "@/contexts/OrderContext";
import { getEstablishments } from "@/service/establishments";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Restaurant {
  id: number;
  name: string;
  logo_url: string;
  distance_meters: number;
  is_near: boolean;
}

export default function ChooseRestaurant() {
  const router = useRouter();
  const { setRestaurant } = useOrder();


  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getEstablishments();
        if (mounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((r: any, idx: number) => {
            const seed = Number(r.id ?? idx + 1);
            // deterministic pseudo-distance when backend doesn't provide one
            const distance = r.distance_meters ?? ((seed * 413) % 3000); // 0..2999
            const isNear = typeof r.is_near === 'boolean' ? r.is_near : (distance < 1000);

            return {
              id: r.id ?? idx + 1,
              name: r.nome ?? r.name ?? `Estabelecimento ${idx + 1}`,
              // backend uses `foto` for images — map to logo_url
              logo_url: r.foto ?? r.logo_url ?? '',
              distance_meters: distance,
              is_near: isNear,
            } as Restaurant;
          });
          setRestaurants(mapped);
        } else {
          setRestaurants([]);
        }
      } catch (err) {
        console.warn('Failed to load establishments', err);
        setRestaurants([]);
      }
    })();
    return () => { mounted = false };
  }, []);

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${meters} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const handleSelect = (restaurant: Restaurant) => {
    setRestaurant(restaurant.id, restaurant.name);

    if (restaurant.is_near) {
      router.push("/Welcome");
    } else {
      router.push("/OutOfArea");
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#111111] p-6">
      <View className="items-center mb-8 mt-4">
        <Image
          source={{
            uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/NomeX.png",
          }}
          className="h-32 w-64"
          resizeMode="contain"
        />
      </View>

      <Text className="text-white text-3xl font-bold text-center mb-2">
        ESCOLHA O ESTABELECIMENTO
      </Text>

      <Text className="text-gray-400 text-center mb-8">
        Selecione um bar para começar
      </Text>

      <View className="space-y-4">
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            onPress={() => handleSelect(restaurant)}
            className="w-full bg-white mt-4 rounded-2xl p-4 flex-row items-center space-x-4 shadow-lg"
          >
            <Image
              source={{ uri: restaurant.logo_url }}
              className="w-16 h-16 rounded-lg"
              resizeMode="cover"
            />

            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-lg">
                {restaurant.name}
              </Text>

              <Text className="text-gray-600 text-sm mt-1">
                📍 {formatDistance(restaurant.distance_meters)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
