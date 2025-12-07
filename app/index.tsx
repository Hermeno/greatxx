import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/ChooseRestaurant");
  //   }, 2500);

  //   return () => clearTimeout(timer);
  // }, []);



  useEffect(() => {
    (async () => {
      try {
        // the auth service stores the token under 'token'
        const token = await SecureStore.getItemAsync('token');
        // show splash for a short while then navigate based on token
        setTimeout(() => {
          if (token) {
            router.replace('/ChooseRestaurant');
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
    <View className="flex-1 bg-black items-center justify-center p-8">
      <Image
        source={{ uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png" }}
        className="w-64 h-64 mb-8"
        resizeMode="contain"
      />

      <View className="items-center">
        <Text className="text-white text-2xl mb-2">BEM VINDO AO</Text>
        <Text className="text-white text-5xl font-bold">Great-X</Text>
      </View>
    </View>
  );
}
