// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { OrderProvider } from '../contexts/OrderContext';
import "../global.css";

export default function RootLayout() {
  return (
    <OrderProvider>
      <StatusBar style="light" backgroundColor="#111111" translucent={false} />
      
      <Stack
        screenOptions={{
          headerShown: false, // Oculta header padrão do Stack
          contentStyle: { backgroundColor: '#111111' }, // Fundo padrão do app
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="ChooseRestaurant" />
        <Stack.Screen name="HomeMenu" />
  <Stack.Screen name="MenuOptions" />
  <Stack.Screen name="MenuItems/[category]" />
  <Stack.Screen name="Promotions" />
  <Stack.Screen name="SessionHistory" />
  <Stack.Screen name="CloseAccountButton" />
  <Stack.Screen name="PagamentoConcluido" />
  <Stack.Screen name="CashierPayment" />
  <Stack.Screen name="NfcPayment" />
  <Stack.Screen name="OutOfArea" />
  <Stack.Screen name="Welcome" />
      </Stack>
    </OrderProvider>
  );
}
