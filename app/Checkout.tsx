import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { useOrder } from '../contexts/OrderContext';

export default function Checkout() {
  const router = useRouter();
  const { customerName, items, getTotal } = useOrder();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentOptions = [
    { id: 'saved', label: 'Pagar com Cartão Cadastrado no APP', icon: '💳' },
    { id: 'nfc', label: 'Pagar com Débito ou Crédito usando o NFC do seu Celular', icon: '📱' },
    { id: 'cashier', label: 'Pagar no Caixa', icon: '💵' },
  ];

  const handlePayment = () => {
    if (selectedPayment === 'saved') router.push('/PaymentComplete');
    else if (selectedPayment === 'nfc') router.push('/NFCPayment');
    else if (selectedPayment === 'cashier') router.push('/CashierPayment');
  };

  return (
    <View className="flex-1 bg-[#111111]">
      <Header />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 }}>
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
            selectedPayment === option.id ? (
              <LinearGradient
                key={option.id}
                colors={["#06b6d4", "#3b82f6"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{ borderRadius: 12, marginTop: 8 }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedPayment(option.id)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 12 }}
                  activeOpacity={0.85}
                >
                  <Text className="text-xl">{option.icon}</Text>
                  <Text className="font-semibold text-lg text-white">{option.label}</Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedPayment(option.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 12, backgroundColor: '#fff', marginTop: 8 }}
                activeOpacity={0.85}
              >
                <Text className="text-xl">{option.icon}</Text>
                <Text className="font-semibold text-lg text-gray-900">{option.label}</Text>
              </TouchableOpacity>
            )
          ))}
        </View>

        {selectedPayment ? (
          <LinearGradient
            colors={["#4ade80", "#16a34a"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 999, marginBottom: 16 }}
          >
            <TouchableOpacity
              onPress={handlePayment}
              style={{ paddingVertical: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 999 }}
              activeOpacity={0.85}
            >
              <Text className="text-lg font-semibold text-white">CONFIRMAR PAGAMENTO</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            disabled={true}
            style={{ paddingVertical: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 999, backgroundColor: '#374151', marginBottom: 16 }}
          >
            <Text className="text-lg font-semibold text-gray-400">CONFIRMAR PAGAMENTO</Text>
          </TouchableOpacity>
        )}


        {/* vamos criar um butao sair aqui, ele vai direto no ChooseRestaurant */}
        <TouchableOpacity
          onPress={() => router.push('/ChooseRestaurant')}
          className="mt-2 py-4 rounded-full bg-red-600 flex items-center justify-center"
        >
          <Text className="text-lg font-semibold text-white"> SAIR X          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

  );
}
