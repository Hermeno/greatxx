import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useOrder } from '../contexts/OrderContext';

export default function Checkout() {
  const router = useRouter();
  const { customerName, items, getTotal } = useOrder();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentOptions = [
    { id: 'saved', label: 'Pagar com Cartão Cadastrado no APP', icon: '💳' },
    { id: 'nfc', label: 'Pagar com Débito ou Crédito usando NFC do seu Celular', icon: '📱' },
    { id: 'cashier', label: 'Pagar no Caixa', icon: '💵' },
  ];

  const handlePayment = () => {
    if (selectedPayment === 'saved') router.push('/PaymentComplete');
    else if (selectedPayment === 'nfc') router.push('/NFCPayment');
    else if (selectedPayment === 'cashier') router.push('/CashierPayment');
  };

  return (
    <ScrollView className="bg-[#111111] min-h-screen px-6 pt-24 pb-8">
      <Header />

      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-2 mb-6"
      >
        <Text className="text-white text-xl">⬅️</Text>
        <Text className="text-white">Voltar</Text>
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-8">Fechamento</Text>

      <View className="bg-white rounded-2xl p-6 shadow mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">{customerName}</Text>
        <Text className="text-gray-600 mb-4">Seu consumo foi</Text>

        <View className="mb-6">
          {items.map((item) => (
            <View key={item.id} className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-900">{item.name}</Text>
              <Text className="text-gray-900 text-center">{item.quantity}</Text>
              <Text className="text-gray-900 text-right">R$ {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View className="border-t-2 border-gray-900 pt-4 flex-row justify-between">
          <Text className="text-2xl font-bold text-gray-900">Total =</Text>
          <Text className="text-2xl font-bold text-gray-900">R$ {getTotal().toFixed(2)}</Text>
        </View>
      </View>

      <Text className="text-white text-2xl font-bold mb-4">Opções de Pagamento</Text>
      <View className="space-y-3 mb-8">
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedPayment(option.id)}
            className={`flex-row items-center gap-4 p-4 rounded-xl ${
              selectedPayment === option.id
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500'
                : 'bg-white'
            }`}
          >
            <Text className="text-xl">{option.icon}</Text>
            <Text className="font-semibold text-lg text-white">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handlePayment}
        disabled={!selectedPayment}
        className={`py-4 rounded-full flex items-center justify-center ${
          selectedPayment
            ? 'bg-gradient-to-r from-green-400 to-green-600'
            : 'bg-gray-700'
        }`}
      >
        <Text className={`text-lg font-semibold ${selectedPayment ? 'text-white' : 'text-gray-400'}`}>
          CONFIRMAR PAGAMENTO
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
