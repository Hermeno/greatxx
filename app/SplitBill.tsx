// app/screens/SplitBill.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Header from '@/components/Header';
import { useOrder } from '@/contexts/OrderContext';

export default function SplitBill() {
  const router = useRouter();
  const { customerName, items: cartItems, transferredAmount } = useOrder();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [numPeople, setNumPeople] = useState<string>('2');
  const [amountToDivide, setAmountToDivide] = useState<string>('');

  // Transforma items do contexto em formato com IDs para seleção
  const getAllItems = () => {
    return cartItems.map((item, idx) => ({
      ...item,
      id: item.id,
    }));
  };

  const getTotalFromAllOrders = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getAvailableBalance = () => {
    return getTotalFromAllOrders() - transferredAmount;
  };

  const getTotalToDivide = () => {
    if (transferredAmount > 0) {
      return parseFloat(amountToDivide) || 0;
    }
    const allItems = getAllItems();
    return allItems
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getPerPersonAmount = () => {
    const total = getTotalToDivide();
    const people = parseInt(numPeople, 10) || 2;
    return total / people;
  };

  const getMyAmount = () => {
    return getPerPersonAmount();
  };

  const getTransferAmount = () => {
    const people = parseInt(numPeople, 10) || 2;
    return getPerPersonAmount() * (people - 1);
  };

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    const people = parseInt(numPeople, 10) || 2;
    if (people < 2) return;

    const availableBalance = getAvailableBalance();
    const totalToDivide = getTotalToDivide();
    
    if (totalToDivide > availableBalance) {
      Alert.alert(
        'Valor inválido',
        `Você não pode dividir R$ ${totalToDivide.toFixed(2)}. Valor a Pagar: R$ ${availableBalance.toFixed(2)}`
      );
      return;
    }

    if (totalToDivide <= 0) {
      Alert.alert('Informe o valor', 'Informe o valor que deseja dividir.');
      return;
    }

    const allItems = getAllItems();
    const selectedItemsList = allItems.filter(item => selectedItems.has(item.id));
    const perPersonAmount = getPerPersonAmount();

    const transfers = Array.from({ length: people - 1 }, (_, i) => ({
      personIndex: i + 2,
      items: selectedItemsList,
      total: perPersonAmount,
    }));

    // Como expo-router pode não aceitar objetos complexos diretamente em params,
    // serializamos os transfers. A tela destino pode desserializar.
    router.push({
      pathname: '/SplitPayment',
      params: {
        transfers: JSON.stringify(transfers),
        myAmount: getMyAmount().toString(),
        totalTransferred: getTransferAmount().toString(),
      },
    });
  };

  const shouldShowAmountInput = transferredAmount > 0;

  // Helpers for UI state booleans
  const canContinue =
    (shouldShowAmountInput ? parseFloat(amountToDivide) > 0 : selectedItems.size > 0) &&
    parseInt(numPeople, 10) >= 2 &&
    getTotalToDivide() <= getAvailableBalance() &&
    getTotalToDivide() > 0;

  return (
    <View className="flex-1 bg-[#111111]">
      {/* Header: mantenha seu Header customizado ou remova se não existir */}
      <Header />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-6">
        <View className="pb-8 max-w-md w-full mx-auto">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-2 mb-6"
            activeOpacity={0.7}
          >
            <ArrowLeft width={20} height={20} color="#ffffff" />
            <Text className="text-white text-base">Voltar</Text>
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-6">Divisão de Conta</Text>

          <View className="bg-white rounded-2xl p-6 shadow-xl mb-6">
            <View className="border-b border-gray-200 pb-4 mb-4">
              <Text className="text-2xl font-bold text-gray-900">{customerName}</Text>
            </View>

            <View className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold text-gray-700">Total dos pedidos:</Text>
                <Text className="text-gray-700">R$ {getTotalFromAllOrders().toFixed(2)}</Text>
              </View>

              {transferredAmount > 0 && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-orange-600 font-semibold">Já transferido via NFC:</Text>
                  <Text className="text-orange-600 font-semibold">- R$ {transferredAmount.toFixed(2)}</Text>
                </View>
              )}

              <View className="flex-row justify-between items-center font-bold text-lg mt-2 pt-2 border-t border-orange-200">
                <Text className="text-green-600 font-bold">Valor a Pagar:</Text>
                <Text className="text-green-600 font-bold">R$ {getAvailableBalance().toFixed(2)}</Text>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-600 mb-2">Dividir entre quantas pessoas?</Text>
              <TextInput
                value={numPeople}
                onChangeText={(t) => {
                  // allow only numbers and clamp
                  const clean = t.replace(/[^0-9]/g, '');
                  if (clean === '') setNumPeople('2');
                  else {
                    const n = Math.max(2, Math.min(99, parseInt(clean, 10)));
                    setNumPeople(n.toString());
                  }
                }}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => {
                  if (shouldShowAmountInput) {
                    if (parseFloat(amountToDivide) > 0 && parseInt(numPeople, 10) >= 2) {
                      handleContinue();
                    }
                  } else if (selectedItems.size > 0 && parseInt(numPeople, 10) >= 2) {
                    handleContinue();
                  }
                }}
                className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 focus:border-cyan-400 text-gray-900 font-semibold text-lg text-center"
                placeholder="Digite o número de pessoas"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {shouldShowAmountInput ? (
              <View>
                <Text className="text-gray-600 mb-4">Quanto deseja dividir do valor restante?</Text>
                <View className="mb-4">
                  <View className="relative">
                    <Text className="absolute left-4 top-3 text-gray-500 font-semibold text-lg">R$</Text>
                    <TextInput
                      value={amountToDivide}
                      onChangeText={(txt) => {
                        // allow decimal numbers
                        const clean = txt.replace(/[^0-9.,]/g, '').replace(',', '.');
                        const parsed = parseFloat(clean);
                        const maxValue = getAvailableBalance();
                        if (!isNaN(parsed) && parsed > maxValue) {
                          setAmountToDivide(maxValue.toFixed(2));
                        } else {
                          setAmountToDivide(clean);
                        }
                      }}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        if (parseFloat(amountToDivide) > 0 && parseInt(numPeople, 10) >= 2 && getTotalToDivide() <= getAvailableBalance()) {
                          handleContinue();
                        }
                      }}
                      className="w-full py-3 pl-12 pr-4 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold text-lg"
                      placeholder="0.00"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <Text className="text-sm text-gray-500 mt-2">
                    Valor a Pagar: R$ {getAvailableBalance().toFixed(2)}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text className="text-gray-600 mb-4">Selecione os itens que deseja dividir:</Text>
                <View className="space-y-3">
                  {(() => {
                    const allItems = getAllItems();
                    return allItems.map((item: any) => {
                      const isSelected = selectedItems.has(item.id);
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => toggleItemSelection(item.id)}
                          activeOpacity={0.8}
                          className={`w-full border rounded-lg p-4 ${isSelected ? 'border-cyan-400 bg-cyan-50' : 'border-gray-200 bg-white'}`}
                        >
                          <View className="flex-row items-start gap-3">
                            <View className={`w-6 h-6 rounded border-2 flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300 bg-white'}`}>
                              {isSelected && <Check width={14} height={14} color="#ffffff" />}
                            </View>

                            <View className="flex-1">
                              <Text className="font-semibold text-gray-900">{item.name}</Text>
                              <Text className="text-sm text-gray-600">Qtd: {item.quantity} × R$ {item.price.toFixed(2)}</Text>
                            </View>

                            <View className="text-right">
                              <Text className="font-bold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    });
                  })()}
                </View>
              </View>
            )}
          </View>

          {(shouldShowAmountInput ? parseFloat(amountToDivide) > 0 : selectedItems.size > 0) && (
            <View className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-6 mb-6">
              <Text className="text-white font-bold text-lg mb-4">Resumo da Divisão</Text>

              <View className="mb-4 pb-4 border-b border-cyan-400/30">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white">Total a dividir:</Text>
                  <Text className="font-bold text-xl text-white">R$ {getTotalToDivide().toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-white">Por pessoa:</Text>
                  <Text className="font-bold text-white">R$ {getPerPersonAmount().toFixed(2)}</Text>
                </View>
              </View>

              <View className="space-y-2 mb-4 pb-4 border-b border-cyan-400/30">
                <View className="flex-row justify-between items-center">
                  <Text className="text-green-300 font-semibold">Sua parte ({customerName}):</Text>
                  <Text className="font-bold text-lg text-white">R$ {getMyAmount().toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-orange-300 font-semibold">
                    A transferir ({parseInt(numPeople, 10) - 1} pessoa{parseInt(numPeople, 10) - 1 > 1 ? 's' : ''}):
                  </Text>
                  <Text className="font-bold text-lg text-white">R$ {getTransferAmount().toFixed(2)}</Text>
                </View>
              </View>

              <View>
                <Text className="text-sm text-cyan-200">💡 Você ficará com R$ {getMyAmount().toFixed(2)} e transferirá R$ {getTransferAmount().toFixed(2)} via NFC para {parseInt(numPeople, 10) - 1} pessoa{parseInt(numPeople, 10) - 1 > 1 ? 's' : ''}.</Text>
                <Text className="text-sm text-cyan-200 mt-2">💡 A taxa de serviço de 10% será aplicada apenas na sua parte ao finalizar o pagamento.</Text>
              </View>
            </View> 
          )}

          {/* <TouchableOpacity onPress={handleContinue} disabled={!canContinue} activeOpacity={0.9} className={`w-full py-4 px-6 rounded-full font-semibold text-lg shadow-lg ${canContinue ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`} style={{ opacity: canContinue ? 1 : 0.6 }}>
            <Text className={`${canContinue ? 'text-white' : 'text-gray-400'} text-center`}>TRANSFERIR VIA NFC</Text>
          </TouchableOpacity> */}


          <TouchableOpacity  activeOpacity={0.85} onPress={handleContinue} disabled={!canContinue} >
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999, marginBottom: 8 }}
            >
              <Text className={`${canContinue ? 'text-white' : 'text-gray-400'} text-center`}>TRANSFERIR VIA NFC</Text>
            </LinearGradient>
          </TouchableOpacity>



          {(shouldShowAmountInput ? parseFloat(amountToDivide) > 0 : selectedItems.size > 0) &&
           getTotalToDivide() > getAvailableBalance() && (
            <Text className="text-red-400 text-center mt-3 text-sm">⚠️ Valor a dividir excede o valor a pagar</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
