import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.replace('/login');
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-xl">Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
