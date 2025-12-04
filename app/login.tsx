import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, isPending } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, senha);
      alert('Login realizado com sucesso!');
      // if a redirect param was provided, go there (use replace to avoid back navigation to login)
      const redirect = params?.redirect as string | undefined;
      if (redirect) {
        // redirect may be a pathname like '/ConfirmOrder'
        // cast to any to avoid strict typing constraints from expo-router path union
        router.replace(redirect as any);
      } else {
        router.push('/code');
      }
    } catch (error: any) {
      alert('Erro ao realizar login: ' + (error?.message || error));
    }
  };

  return (
    <View className="flex-1 bg-[#003761] px-8 justify-center">
      <StatusBar style="light" backgroundColor="#003761" />

      {/* Título */}
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Entrar
      </Text>

      {/* Campo Email */}
      <View className="mb-5">
        <Text className="text-white mb-2 font-semibold">Email ou Nome</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email ou nome"
          placeholderTextColor="#A0AEC0"
          className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/30"
        />
      </View>

      {/* Campo Senha */}
      <View className="mb-5">
        <Text className="text-white mb-2 font-semibold">Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/30"
        />
      </View>

      {/* Esqueceu senha */}
      {/* <TouchableOpacity onPress={() => router.push('/recovery')} className="mb-8">
        <Text className="text-[#00F7FF] text-sm text-right font-medium">
          Esqueceu a senha?
        </Text>
      </TouchableOpacity> */}

      {/* Botão Entrar */}
      <TouchableOpacity
        className="bg-[#FF00B6] py-3 rounded-full mb-6 shadow-md active:opacity-80"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-semibold text-center">
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Linha divisória */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-white/30" />
        <Text className="text-white mx-3 text-sm">ou</Text>
        <View className="flex-1 h-px bg-white/30" />
      </View>

      {/* Botões sociais */}
      <View className="flex-row justify-center gap-4">
        <TouchableOpacity className="flex-row items-center bg-[#DB4437] px-5 py-2 rounded-full">
          <FontAwesome name="google" size={20} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-[#4267B2] px-5 py-2 rounded-full">
          <FontAwesome name="facebook" size={20} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Criar conta */}
      <View className="mt-10 flex-row justify-center">
        <Text className="text-white text-base">Não tem conta? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text className="text-[#00F7FF] font-semibold">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
