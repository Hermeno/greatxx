// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { OrderProvider } from '../contexts/OrderContext';
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrderProvider>
        {/* <StatusBar style="light" backgroundColor="#111111" translucent={false} /> */}
        
        <Stack
          screenOptions={{
            headerShown: false, // Oculta header padrão do Stack
            contentStyle: { backgroundColor: '#111111' }, // Fundo padrão do app
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="AuthCallback" />
          <Stack.Screen name="Splash" />
          <Stack.Screen name="ChooseRestaurant" />
          <Stack.Screen name="HomeMenu" />
          <Stack.Screen name="MenuOptions" />
          <Stack.Screen name="MenuItems/[category]" />
          <Stack.Screen name="Promotions" />
          <Stack.Screen name="SessionHistory" />
          <Stack.Screen name="EventsFeed" />
          <Stack.Screen name="Home" />
          <Stack.Screen name="code" />
          <Stack.Screen name="OutOfArea" />
          <Stack.Screen name="Welcome" />
          <Stack.Screen name="OrderSummary" />
          <Stack.Screen name="ConfirmOrder" />
          <Stack.Screen name="Checkout" />
          <Stack.Screen name="SplitPayment" />
          <Stack.Screen name="SplitBill" />
          <Stack.Screen name="CashierPayment" />
          <Stack.Screen name="NFCPayment" />
          <Stack.Screen name="PaymentComplete" />
        </Stack>
      </OrderProvider>
    </AuthProvider>
  );
}
