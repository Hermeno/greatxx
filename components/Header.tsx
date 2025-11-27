import { Entypo, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const IconMenu = () => <Feather name="menu" size={24} color="white" />;
  // const IconMenu = () => <Text className="text-white text-2xl">≡</Text>;
  const IconSearch = () => <Feather name="search" size={24} color="white" />;
  // const IconSearch = () => <Text className="text-white text-xl">🔍</Text>;
  const IconHistory = () => <Entypo name="time-slot" size={24} color="white" />;
  // const IconHistory = () => <Text className="text-white text-xl">🕒</Text>;

  return (
    <>
      <SafeAreaView className="w-full z-50 bg-black/80 border-b border-gray-800">
        <View className="w-full max-w-md mx-auto px-4 py-4 flex-row items-center justify-between">
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          {/* Ícone do menu (esquerda) */}
          <TouchableOpacity className="p-2" onPress={() => setShowMenu(!showMenu)}>
            <IconMenu />
          </TouchableOpacity>

          {/* Logo centralizado */}
          <View className="flex-row items-center justify-center flex-1">
            <View className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <Text className="text-white font-bold text-sm">GX</Text>
            </View>
            <Text className="text-white font-bold text-lg">Great-X</Text>
          </View>

          {/* Ícone de pesquisa (direita) */}
          <TouchableOpacity className="p-2">
            <IconSearch />
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {/* MENU DROPDOWN */}
      {showMenu && (
        <>
          {/* Fundo escuro */}
          <TouchableOpacity
            className="fixed inset-0 bg-black/50 z-40"
            onPress={() => setShowMenu(false)}
          />

          {/* Menu suspenso */}
          <View className="fixed ml-2 top-16 left-4 bg-gray-900 rounded-lg shadow-xl z-50 border border-gray-700 overflow-hidden" style={{ maxWidth: '90%', width: 'auto' }}>
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                router.push("/SessionHistory");}}
              className="px-6 py-4 flex flex-row items-center gap-3 ml-2">
              <IconHistory />
              <Text className="text-white text-base">Histórico Geral</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}