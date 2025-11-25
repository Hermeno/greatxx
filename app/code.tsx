import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';






export default function VerifyCode() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    if (code.length === 6) {
      router.push('./ChooseRestaurant');
    } else {
      alert('Código inválido! Digite os 6 dígitos.');
    }
  };

  return (


      <View
        className="flex-1 justify-center  items-center px-4"
        style={{ backgroundColor: '#003761' }}
      >
        <Text className="text-2xl text-white font-bold mb-2 text-center">
          Verificação
        </Text>
        <Text className="text-white text-base mb-6 text-center">
          Digita o código de 6 dígitos enviado para o seu e-mail.
        </Text>

        <TextInput
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={6}
          className="text-black text-center rounded-lg w-3/4 py-3 mb-6 text-xl tracking-widest"
          placeholder="••••••"
          placeholderTextColor="#888"
          style={{ backgroundColor: '#fff' }}
        />

        <TouchableOpacity
          onPress={handleVerify}
          className="rounded-xl px-10 py-3 mb-4"
          style={{ backgroundColor: '#007bff' }}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Verificar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Código reenviado!')}>
          <Text className="text-blue-400 text-base font-medium">
            Reenviar código
          </Text>
        </TouchableOpacity>
      </View>
  );
}
