import AlertModal from "@/components/AlertModal";
import CloseAccountButton from "@/components/CloseAccountButton";
import Header from "@/components/Header";
import QRScanner from "@/components/QRScanner";
import { useOrder } from "@/contexts/OrderContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HomeMenu() {
  const router = useRouter();
  const {
    customerName,
    restaurantName,
    tableNumber,
    setTableNumber,
    getSessionDurationMinutes,
  } = useOrder();

  const [showScanner, setShowScanner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const COUVERT_PRICE = 35.0;
  const COUVERT_TIME_THRESHOLD = 1; // minutes

  const shouldChargeCouvert = () => {
    return getSessionDurationMinutes() > COUVERT_TIME_THRESHOLD;
  };

  const handleBackClick = () => {
    setShowAlert(true);
  };

  const handleQRScan = (tableData: string) => {
    setTableNumber(tableData);
    setShowScanner(false);
  };

  return (
    <View className="flex-1 bg-[#111111]">
      <AlertModal isOpen={showAlert} onClose={() => setShowAlert(false)} title="Comanda Aberta" message="Você precisa fechar sua comanda antes de sair. Use o botão 'FECHAR CONTA' abaixo."/>

      {showScanner && (
        <QRScanner visible={showScanner} onScan={handleQRScan} onClose={() => setShowScanner(false)} />
      )}

      <Header />

      <View className="pb-8 px-6 flex-1 ">
        {/* BOTÃO VOLTAR */}
        <TouchableOpacity onPress={handleBackClick} className="flex flex-row items-center gap-2 mb-6">
          <ArrowLeft size={20} color="white" />
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>

        {/* CARTÃO CENTRAL */}
        <View className="bg-white rounded-2xl p-6 mb-6 items-center shadow-xl">
          <View className="w-20 h-20 mb-4">
            <Image
              source={{
                uri: "https://mocha-cdn.com/019aa8b4-2189-7590-962f-74d834196d52/Logo.png",
              }}
              className="w-full h-full" resizeMode="contain"
            />
          </View>

          <Text className="text-gray-900 text-lg mb-2 text-center">
            Olá {customerName}! Bem vindo ao{" "}
            <Text className="font-bold">{restaurantName}</Text>
          </Text>

          {tableNumber && (
            <View className="flex flex-row items-center justify-center gap-3 mt-2">
              <Text className="text-cyan-600 font-semibold text-lg">
                {tableNumber}
              </Text>

              <TouchableOpacity onPress={() => setShowScanner(true)} className="px-3 py-1 bg-cyan-600 rounded-full">
                <Text className="text-white text-sm font-semibold">
                  Trocar de Mesa
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {shouldChargeCouvert() && (
            <View className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded-lg">
              <Text className="text-yellow-600 font-semibold text-sm">
                ⚠️ Couvert de R$ {COUVERT_PRICE.toFixed(2)} será cobrado
              </Text>
            </View>
          )}
        </View>

        {/* BOTÃO ESCANEAR */}
        {!tableNumber && (
          <TouchableOpacity onPress={() => setShowScanner(true)} activeOpacity={0.85} className="mb-6">

        {!tableNumber && (
          <TouchableOpacity onPress={() => setShowScanner(true)} className="w-full mb-6 py-4 px-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-400 items-center justify-center"
          >
            <Text className="text-white font-semibold text-lg">ESCANEAR QR CODE DA MESA</Text>
          </TouchableOpacity>
        )}

          </TouchableOpacity>
        )}

        {/* BOTÕES GRADIENTES */}
        <View className="space-y-4 mb-8">



          <TouchableOpacity onPress={() => router.push('/MenuOptions')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999, marginBottom: 8 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER CARDÁPIO</Text>
            </LinearGradient>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => router.push('/Promotions')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER PROMOÇÕES</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/SessionHistory')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999, marginTop: 8 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER HISTÓRICO DA SESSÃO</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        {/* BOTÃO FECHAR CONTA */}
        <CloseAccountButton  onPress={() => router.push('/Checkout')}  />
      </View>
    </View>
  );
}
