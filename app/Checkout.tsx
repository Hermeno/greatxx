import Header from "@/components/Header";
import { useOrder } from "@/contexts/OrderContext";
import { useRouter } from "expo-router";
import { AlertCircle, ArrowLeft, Banknote, Smartphone, Users, Wallet } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Checkout() {
  const router = useRouter();
  const { customerName, transferredAmount, getSessionDurationMinutes, items } = useOrder();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showCouvertWarning, setShowCouvertWarning] = useState(false);

  const COUVERT_PRICE = 35.0;
  const COUVERT_TIME_THRESHOLD = 1;

  const shouldChargeCouvert = () => getSessionDurationMinutes ? getSessionDurationMinutes() > COUVERT_TIME_THRESHOLD : false;
  const getCouvertCharge = () => shouldChargeCouvert() ? COUVERT_PRICE : 0;

  const getAllItems = () => {
    return items; // Retorna items do contexto diretamente
  };

  const getTotalFromAllOrders = () => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const getSubtotal = () => getTotalFromAllOrders() - transferredAmount;
  const getServiceFee = () => getSubtotal() * 0.1;
  const getFinalTotal = () => getSubtotal() + getServiceFee() + getCouvertCharge();
  const isAccountEmpty = () => getFinalTotal() === 0;

  const paymentOptions = [
    { id: 'saved', label: 'Pagar com Cartão Cadastrado no APP', icon: Wallet },
    { id: 'nfc', label: 'Pagar com Débito ou Crédito usando NFC do seu Celular', icon: Smartphone },
    { id: 'cashier', label: 'Pagar no Caixa', icon: Banknote },
  ];

  const allItems = getAllItems();

  const handlePayment = () => {
    if (allItems.length === 0 && shouldChargeCouvert()) {
      setShowCouvertWarning(true);
      return;
    }

    if (selectedPayment === 'saved') router.push('/PaymentComplete');
    else if (selectedPayment === 'nfc') router.push('/NFCPayment');
    else if (selectedPayment === 'cashier') router.push('/CashierPayment');
  };

  const handleCouvertOnlyPayment = () => {
    setShowCouvertWarning(false);
    handlePayment();
  };

  return (
    <View className="flex-1 bg-[#111111]">
      {/* Couvert Warning Modal */}
      {showCouvertWarning && (
        <View className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <View className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border-2 border-yellow-500 shadow-lg">
            <View className="flex items-center justify-center mb-4">
              <View className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-yellow-500" />
              </View>
            </View>

            <Text className="text-white text-2xl font-bold text-center mb-4">Comanda Vazia</Text>
            <Text className="text-gray-300 text-lg text-center mb-6">
              Sua comanda está vazia, mas você permaneceu no estabelecimento por mais de 1 minuto. Será cobrado apenas o couvert de R$ {COUVERT_PRICE.toFixed(2)}.
            </Text>

            <View className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <View className="flex-row justify-between items-center text-yellow-300">
                <Text className="font-semibold">Couvert:</Text>
                <Text className="text-xl font-bold">R$ {COUVERT_PRICE.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-yellow-500/30">
                <Text className="font-bold text-xl">Total:</Text>
                <Text className="text-2xl font-bold">R$ {COUVERT_PRICE.toFixed(2)}</Text>
              </View>
            </View>

            <View className="space-y-3">
              <TouchableOpacity
                onPress={handleCouvertOnlyPayment}
                className="w-full py-3 rounded-full bg-green-500 text-white font-semibold text-lg"
              >
                <Text className="text-center">PAGAR COUVERT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowCouvertWarning(false)}
                className="w-full py-3 rounded-full bg-gray-700 text-white font-semibold text-lg"
              >
                <Text className="text-center">CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Header />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={true}
      >
        <View className="px-6 pt-2">
          {/* Botão Voltar */}
          <TouchableOpacity
            onPress={() => router.push("/HomeMenu")}
            className="flex flex-row items-center gap-2 mb-6 bg-success-500"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <Text className="text-white text-lg">Voltar</Text>
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-8">Fechamento</Text>

          <View className="bg-white rounded-2xl p-6 shadow-xl mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">{customerName}</Text>

            {/* Lista de itens */}
            <View className="border-b border-gray-200 pb-2 mb-4 flex-row justify-between">
              <Text className="font-semibold text-gray-600">Produto</Text>
              <Text className="font-semibold text-gray-600 text-center w-12">Qtd</Text>
              <Text className="font-semibold text-gray-600 text-right w-16">Preço</Text>
            </View>

            {allItems.map((item, idx) => (
              <View key={idx} className="flex-row justify-between mb-2">
                <Text className="text-gray-900 flex-1">{item.name}</Text>
                <Text className="text-gray-900 w-12 text-center">{item.quantity}</Text>
                <Text className="text-gray-900 w-16 text-right">R$ {(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}

            {/* Subtotal e Couvert */}
            {transferredAmount > 0 && (
              <View className="border-t border-gray-200 mt-4 pt-2">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Subtotal:</Text>
                  <Text className="text-gray-600">R$ {getTotalFromAllOrders().toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-orange-600">Transferido via NFC:</Text>
                  <Text className="text-orange-600">- R$ {transferredAmount.toFixed(2)}</Text>
                </View>
              </View>
            )}

            <View className="border-t border-gray-200 mt-4 pt-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Subtotal sua parte:</Text>
                <Text className="text-gray-600">R$ {getSubtotal().toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-yellow-600">Taxa de Serviço (10%):</Text>
                <Text className="text-yellow-600">R$ {getServiceFee().toFixed(2)}</Text>
              </View>
              {shouldChargeCouvert() && (
                <View className="flex-row justify-between mt-1">
                  <Text className="text-yellow-600">Couvert:</Text>
                  <Text className="text-yellow-600">R$ {COUVERT_PRICE.toFixed(2)}</Text>
                </View>
              )}
            </View>

            <View className="border-t-2 border-gray-900 mt-4 pt-2 flex-row justify-between">
              <Text className="text-gray-900 text-2xl font-bold">Total =</Text>
              <Text className="text-gray-900 text-2xl font-bold">R$ {getFinalTotal().toFixed(2)}</Text>
            </View>

            {isAccountEmpty() && (
              <View className="mt-4 p-4 bg-green-50 border border-green-500 rounded-lg">
                <Text className="text-green-700 font-semibold text-center">
                  ✓ Sua conta está zerada! Você pode continuar fazendo pedidos ou fechar sua comanda.
                </Text>
              </View>
            )}
          </View>

          {/* Opções de pagamento */}
          <Text className="text-white text-2xl font-bold mb-4">Opções de Pagamento</Text>
          <View className="space-y-3 mb-8">
            {paymentOptions.map((option) => {
              const Icon = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSelectedPayment(option.id)}
                  className={`w-full p-4 rounded-xl flex-row items-center gap-4 mt-2 ${
                    selectedPayment === option.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <Text className="font-semibold text-lg">{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

        <TouchableOpacity
          onPress={handlePayment}
          disabled={!selectedPayment}
          className={`w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center mb-3 ${
            selectedPayment ? 'bg-green-500' : 'bg-gray-700'
          }`}
        >
          <Text className={`${selectedPayment ? 'text-white' : 'text-gray-400'}`}>
            CONFIRMAR PAGAMENTO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/SplitBill')}
          className="w-full py-4 rounded-full bg-purple-500 flex flex-row items-center justify-center gap-2 font-semibold text-lg"
        >
          <Users className="w-5 h-5 text-white" />
          <Text className="text-white">DIVISÃO DE CONTA</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}
