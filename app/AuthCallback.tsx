import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white text-xl">Redirecionando...</Text>
    </View>
  );
}
