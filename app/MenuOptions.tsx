import CloseAccountButton from '@/components/CloseAccountButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

const categories = [
  { name: 'Porções', slug: 'Porções' },
  { name: 'Pratos', slug: 'Pratos' },
  { name: 'Cervejas', slug: 'Cervejas' },
  { name: 'Drinks', slug: 'Drinks' },
  { name: "Drink's sem Álcool", slug: 'Drinks sem Álcool' },
];

export default function MenuOptions() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#111111]">

      <Header />
      {/* Header placeholder */}
      <View className="h-16" />

      <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Text className="text-white text-lg">⬅️</Text>
          <Text className="text-white text-lg">Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold text-center mb-8">
          Opções do Cardápio
        </Text>

        <View className="w-full space-y-4 mb-8">
          {categories.map((category) => (

            <TouchableOpacity key={category.slug}
               onPress={() => router.push(`/MenuItems/${category.slug}`)} activeOpacity={0.85} className='mt-2 mb-2'>
              <LinearGradient
                colors={["#34d399", "#ec4899"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
              >
                <Text className="text-white font-semibold text-lg text-center">{category.name}</Text>
              </LinearGradient>
            </TouchableOpacity>




          ))}
        </View>
        <CloseAccountButton />
      </ScrollView>
    </View>
  );
}
