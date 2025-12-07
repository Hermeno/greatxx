import CloseAccountButton from '@/components/CloseAccountButton';
import { getCategorias } from '@/service/categorias';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

// categories loaded from backend

export default function MenuOptions() {
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: number; name: string; slug: string; displayName: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const titleCase = (s: string) =>
    s
      .toLowerCase()
      .split(/\s+/)
      .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ''))
      .join(' ');

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

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getCategorias();
        if (mounted && Array.isArray(data)) {
          const mapped = data.map((c: any, idx: number) => {
            const rawName = (c.nome ?? c.name ?? `Categoria ${idx + 1}`).toString();
            const displayName = titleCase(rawName);
            const slug = slugify(c.slug ?? rawName);
            const id = Number(c.id ?? idx + 1);
            return { id, name: rawName, slug, displayName };
          });
          setCategories(mapped);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.warn('Erro ao buscar categorias', err);
        setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

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

            <TouchableOpacity key={category.id}
               onPress={() => router.push(`/MenuItems?id=${category.id}&slug=${encodeURIComponent(category.slug)}`)} activeOpacity={0.85} className='mt-2 mb-2'>
              <LinearGradient
                colors={["#34d399", "#ec4899"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
              >
                <Text className="text-white font-semibold text-lg text-center">{category.displayName}</Text>
              </LinearGradient>
            </TouchableOpacity>




          ))}
        </View>
        <CloseAccountButton />
      </ScrollView>
    </View>
  );
}
