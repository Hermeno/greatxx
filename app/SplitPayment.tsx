import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOrder } from "../contexts/OrderContext";

interface TransferItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface TransferData {
  personIndex: number;
  items: TransferItem[];
  total: number;
}

export default function SplitPayment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTransferredAmount } = useOrder();

  const transfers: TransferData[] = params.transfers
    ? JSON.parse(String(params.transfers))
    : [];

  const totalTransferred = params.totalTransferred
    ? Number(params.totalTransferred)
    : 0;

  const [currentTransfer, setCurrentTransfer] = useState(0);
  const [completedTransfers, setCompletedTransfers] = useState<number[]>([]);

  const handleSimulateApproach = () => {
    const newCompleted = [...completedTransfers, currentTransfer];
    setCompletedTransfers(newCompleted);

    if (newCompleted.length === transfers.length) {
      addTransferredAmount(totalTransferred);
      router.push("/Checkout");
    } else {
      setCurrentTransfer(currentTransfer + 1);
    }
  };

  if (!transfers || transfers.length === 0) {
    router.push("/Checkout");
    return null;
  }

  const currentData = transfers[currentTransfer];
  const totalPeople = transfers.length + 1;

  return (
    <ScrollView className="flex-1 bg-[#0b0220] px-5 py-8 flex-grow">
      {/* Logo superior */}
      <View className="w-32 h-32 mt-24 mx-auto mb-6 rounded-full border-4 border-transparent bg-transparent flex items-center justify-center overflow-hidden">
        <Image
          source={{
            uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png",
          }}
          className="w-32 h-32 rounded-full"
          resizeMode="contain"
        />
      </View>

      {/* Indicador de progresso */}
      <View className="flex-row justify-center space-x-3 mb-6">
        {transfers.map((_, index) => {
          const done = completedTransfers.includes(index);
          const active = index === currentTransfer;

          return (
            <View
              key={index}
              className={`w-12 h-12 rounded-full items-center justify-center
              ${done ? "bg-emerald-500" : active ? "bg-violet-500" : "bg-gray-700"}`}
            >
              <Text className="text-white font-bold">
                {done ? "✓" : `P${index + 2}`}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Card branco */}
      <View className="bg-white rounded-2xl p-4 mb-5 w-full max-w-md self-center">
        <Text className="text-xl font-bold text-center text-gray-900 mb-2">
          Transferência para Pessoa {currentData.personIndex}
        </Text>

        <View className="bg-violet-100 rounded-lg py-2 px-3 mb-3">
          <Text className="text-center text-violet-700">
            Itens divididos entre {totalPeople} pessoas
          </Text>
        </View>

        {/* Itens */}
        <View className="mb-3">
          {currentData.items.map((item, idx) => (
            <View key={idx} className="mb-2">
              <View className="flex-row justify-between">
                <Text className="font-semibold text-gray-700">{item.name}</Text>
                <Text className="text-gray-500">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View className="border-t border-gray-200 pt-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-900">
              Valor a transferir:
            </Text>
            <Text className="text-lg font-bold text-violet-600">
              R$ {currentData.total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Circular NFC */}
      <View className="items-center mb-6">
        <View className="w-40 h-40 bg-violet-500 rounded-full items-center justify-center mb-2">
          <Text className="text-6xl text-white">🔁</Text>
        </View>

        <Text className="text-white text-xl">Aproxime seu celular</Text>
        <Text className="text-white font-bold text-xl mb-2">
          para transferir via NFC
        </Text>

        <View className="flex-row items-center">
          <Text className="text-violet-200 mr-1">🌊</Text>
          <Text className="text-violet-200">
            Pessoa {currentData.personIndex} aproxime seu celular
          </Text>
        </View>
      </View>

      {/* Logo inferior */}
      <View className="w-20 h-20 mx-auto mb-5 rounded-full border-4 border-transparent bg-transparent flex items-center justify-center overflow-hidden">
        <Image
          source={{
            uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png",
          }}
          className="  w-32 h-32 rounded-full "
          resizeMode="contain"
        />
      </View>

      {/* Botão simular */}
      <TouchableOpacity
        onPress={handleSimulateApproach}
        className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg self-center"
      >
        <Text className="text-white font-semibold">Simular transferência</Text>
      </TouchableOpacity>

      {/* Contador */}
      <Text className="text-violet-200 text-center mt-3">
        Transferência {completedTransfers.length + 1} de {transfers.length}
      </Text>
    </ScrollView>
  );
}
