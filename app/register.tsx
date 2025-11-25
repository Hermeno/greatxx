import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cadastroUsuario } from '@/service/auth'

export default function RegisterScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');


  const handleCadastro = () => {
    const newUser = {
      nome,
      email,
      senha,
    };
    if(!nome || !email || !senha){
      alert("Por favor, preencha todos os campos.");
      return;
    }
    try {
      cadastroUsuario(newUser)
        .then(() => {
          alert("Cadastro realizado com sucesso!");
          router.push("/login");
        })
        .catch((error) => {
          console.error("Erro no cadastro:", error);
          alert("Erro ao cadastrar. Verifique seus dados e tente novamente.");
        });
    } catch (error) {
      console.error("Erro inesperado no cadastro:", error);
      alert("Erro inesperado ao cadastrar. Tente novamente mais tarde.");
    }
  }



  return (
    <View className="flex-1 bg-[#003761] px-8 justify-center">
      <StatusBar style="light" />

      {/* Título */}
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Criar Conta
      </Text>

      {/* Campo Nome */}
      <View className="mb-5">
        <Text className="text-white mb-2 font-semibold">Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          placeholderTextColor="#A0AEC0"
          className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/30"
        />
      </View>

      {/* Campo Email */}
      <View className="mb-5">
        <Text className="text-white mb-2 font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
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

      {/* Campo Confirmar Senha */}
      <View className="mb-5">
        <Text className="text-white mb-2 font-semibold">Confirmar Senha</Text>
        <TextInput
          value={confirmar}
          onChangeText={setConfirmar}
          placeholder="Confirme sua senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/30"
        />
      </View>

      {/* Botão Criar Conta */}
      <TouchableOpacity
        className="bg-[#FF00B6] py-3 rounded-full mb-6 shadow-md active:opacity-80"
        onPress={handleCadastro}
      >
        <Text className="text-white text-lg font-semibold text-center">
          Criar Conta
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

      {/* Já tem conta */}
      <View className="mt-10 flex-row justify-center">
        <Text className="text-white text-base">Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-[#00F7FF] font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
