import { useOrder } from "@/contexts/OrderContext";
import { useRouter } from "expo-router";
import { useState } from "react";
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


  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "GreatX Bar",
      logo_url: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png",
      distance_meters: 350,
      is_near: true,
    },
    {
      id: 2,
      name: "Pizzaria Massa Fina",
      logo_url: "https://images.pexels.com/photos/404558/pexels-photo-404558.jpeg",
      distance_meters: 2100,
      is_near: false,
    },
    {
      id: 3,
      name: "Restaurante Premium",
      logo_url: "https://images.pexels.com/photos/1435909/pexels-photo-1435909.jpeg",
      distance_meters: 780,
      is_near: true,
    },
  ]);

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
