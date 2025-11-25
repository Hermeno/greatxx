import CloseAccountButton from '@/components/CloseAccountButton';
import GradientButton from '@/components/GradientButton';
import Header from '@/components/Header';
import { useOrder } from '@/contexts/OrderContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function OrderSummary() {
  const router = useRouter();
  const { customerName, items } = useOrder();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-[#111111]">
        <Header />

  <View className="pt-24 pb-8 px-4 w-full">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-2 mb-6"
          >
            <Text className="text-white text-lg">← Voltar</Text>
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-8">Seu Pedido</Text>

          <View className="bg-gray-800 rounded-2xl p-8 mb-8 items-center">
            <Text className="text-gray-400">Seu pedido está vazio</Text>
          </View>

          <GradientButton onPress={() => router.push('/MenuItems')}>
            <Text className="text-white font-semibold text-center">IR PARA O CARDÁPIO</Text>
          </GradientButton>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#111111]">
      <Header />

  <View className="pt-24 pb-8 px-4 w-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
        >
          <Text className="text-white text-lg">← Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-8">Seu Pedido</Text>

        <View className="bg-white rounded-2xl p-6 shadow-xl mb-8">
          <View className="border-b border-gray-200 pb-4 mb-4">
            <Text className="text-2xl font-bold text-gray-900">{customerName}</Text>
          </View>

          <Text className="text-gray-600 mb-4">Seu pedido!</Text>

          <View className="space-y-3">
            {/* Header da tabela */}
            <View className="flex-row pb-2 border-b border-gray-200">
              <Text className="flex-2 text-sm font-semibold text-gray-600">Produto</Text>
              <Text className="flex-1 text-center text-sm font-semibold text-gray-600">Qtd</Text>
              <Text className="flex-1 text-right text-sm font-semibold text-gray-600">Preço</Text>
            </View>

            {items.map((item) => (
              <View key={item.id} className="flex-row">
                <Text className="flex-2 font-medium text-gray-900">{item.name}</Text>
                <Text className="flex-1 text-center text-gray-900">{item.quantity}</Text>
                <Text className="flex-1 text-right text-gray-900">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="space-y-4">
          <TouchableOpacity onPress={() => router.push('/ConfirmOrder')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">ENVIAR PEDIDO</Text>
            </LinearGradient>
          </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/MenuItems')} activeOpacity={0.85} className='mt-2 mb-2'>
              <LinearGradient
                colors={["#34d399", "#ec4899"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
              >
                <Text className="text-white font-semibold text-lg text-center">ADICIONAR MAIS ITENS</Text>
              </LinearGradient>
            </TouchableOpacity>






          <CloseAccountButton onPress={() => router.push('/Checkout')} />
        </View>
      </View>
    </ScrollView>
  );
}
