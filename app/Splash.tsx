import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/ChooseRestaurant");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="min-h-screen bg-black flex-1 items-center justify-center p-8">
      <Image
        source={{
          uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png",
        }}
        className="w-64 h-64 mb-8"
        resizeMode="contain"
      />

      <View className="items-center">
        <Text className="text-white text-2xl mb-2">BEM VINDO AO</Text>

        <Text className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
          Great-X
        </Text>
      </View>
    </View>
  );
}
