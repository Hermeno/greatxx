import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CloseAccountButton from '../components/CloseAccountButton';
import Header from '../components/Header';
import QRScanner from '../components/QRScanner';
import { useOrder } from '../contexts/OrderContext';

export default function HomeMenu() {
  const router = useRouter();
  const { customerName, restaurantName, tableNumber, setTableNumber } = useOrder();
  const [showScanner, setShowScanner] = useState(false);

  const handleQRScan = (tableData: string) => {
    setTableNumber(tableData);
    setShowScanner(false);
  };

  return (
    <View className="flex-1 bg-[#111111]">
      {showScanner && (
        <QRScanner
          visible={showScanner}
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      <Header />

      <View className="pt-24 pb-8 px-6 flex-1 items-center">
        <TouchableOpacity
          onPress={() => router.push('/ChooseRestaurant')}
          className="flex-row items-center mb-6"
        >
          <Text className="text-white text-lg">Voltar</Text>
        </TouchableOpacity>

        <View className="bg-white rounded-2xl p-6 mb-6 items-center shadow-lg w-full">
          <View className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 items-center justify-center mb-4">
            <Text className="text-white font-bold text-2xl">GX</Text>
          </View>
          <Text className="text-gray-900 text-lg mb-2 text-center">
            Olá {customerName}! Bem Vindo ao <Text className="font-bold">{restaurantName}</Text>
          </Text>
          {tableNumber && (
            <Text className="text-cyan-600 font-semibold text-lg">{tableNumber}</Text>
          )}
        </View>

        {!tableNumber && (
          <TouchableOpacity
            onPress={() => setShowScanner(true)}
            className="w-full mb-6 py-4 px-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-400 items-center justify-center"
          >
            <Text className="text-white font-semibold text-lg">ESCANEAR QR CODE DA MESA</Text>
          </TouchableOpacity>
        )}

        <View style={{ width: '100%' }} className="mb-8 mt-2">
          <TouchableOpacity onPress={() => router.push('/MenuOptions')} activeOpacity={0.85} style={{ marginBottom: 12 }}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">VER CARDÁPIO</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/Promotions')} activeOpacity={0.85} style={{ marginBottom: 12 }}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">PROMOÇÕES</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/SessionHistory')} activeOpacity={0.85}>
            <LinearGradient
              colors={["#34d399", "#ec4899"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: '100%', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 999 }}
            >
              <Text className="text-white font-semibold text-lg text-center">HISTÓRICO</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <CloseAccountButton />
      </View>
    </View>
  );
}
