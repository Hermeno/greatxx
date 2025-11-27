import { useOrder } from '@/contexts/OrderContext';
import { useRouter } from 'expo-router';
import { CheckCircle, Waves } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentComplete() {
  const router = useRouter();
  const { resetSession } = useOrder();

  const handleBackToStart = () => {
    resetSession();
    router.push('/ChooseRestaurant');
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-900 to-black items-center justify-center p-6">
      
      {/* Logo Superior */}
      <View className="w-32 h-32 mb-12">
        <Image
          source={{ uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png" }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Check Circle */}
      <View className="w-40 h-40 rounded-full bg-green-500 flex items-center justify-center mb-8">
        <CheckCircle className="w-24 h-24 text-white" />
      </View>

      {/* Texto */}
      <View className="items-center space-y-3 mb-12">
        <Text className="text-white text-3xl font-bold">Pago com sucesso</Text>
        <Text className="text-white text-xl">Agradecemos sua presença</Text>
        <Text className="text-white text-xl">Volte sempre!</Text>
      </View>

      {/* Logo Inferior */}
      <View className="w-20 h-20 mb-8">
        <Image
          source={{ uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png" }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Instrução NFC */}
      <View className="flex-row items-center gap-2 mb-12">
        <Waves className="w-6 h-6 text-white" />
        <Text className="text-white">Aproxime na saída para liberação!</Text>
      </View>

      {/* Botão */}
      <TouchableOpacity
        onPress={handleBackToStart}
        className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg"
      >
        <Text className="text-white text-center">Voltar ao início</Text>
      </TouchableOpacity>

    </View>
  );
}
