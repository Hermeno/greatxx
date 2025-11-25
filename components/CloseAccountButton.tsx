import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

interface CloseAccountButtonProps {
  onPress?: () => void;
}

export default function CloseAccountButton({ onPress }: CloseAccountButtonProps) {
  const router = useRouter();

  const handlePress = onPress ?? (() => router.push('/Checkout'));

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full py-4 px-6 rounded-full bg-red-600 shadow-lg flex flex-row items-center justify-center gap-2 active:opacity-80"
    >
      <Text className="text-white text-xl">✖️</Text>
      <Text className="text-white font-semibold text-lg">FECHAR CONTA</Text>
    </TouchableOpacity>
  );
}
