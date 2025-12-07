import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // the auth service stores the token under 'token'
        const token = await SecureStore.getItemAsync('token');
        // show splash for a short while then navigate based on token
        setTimeout(() => {
          if (token) {
            router.replace('/login');
          } else {
            router.replace('/login');
          }
        }, 1200);
      } catch (err) {
        console.error('Erro ao checar token no splash:', err);
        router.replace('/login');
      }
    })();
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
