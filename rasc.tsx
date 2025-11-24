// Tela de Splash / Boas-vindas
// Login
// Cadastro
// Home
// Perguntas (quiz)
// Resultado / feedback
// Perfil
// Configurações
// Logout




// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Animated, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import Layout from './home/_template';

// const data = [
//   { id: '1', title: 'Bar do Zé', link: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', rating: 4.5, distance: '1.2km' },
//   { id: '2', title: 'Bar Sanduíche', link: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092', rating: 4.2, distance: '0.8km' },
//   { id: '3', title: 'Bar Quente', link: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', rating: 4.8, distance: '2.0km' },
//   { id: '4', title: 'Bar Jull Roger', link: 'https://images.unsplash.com/photo-1551218808-94e220e084d2', rating: 4.1, distance: '0.5km' },
//   { id: '5', title: 'Bar do Zé', link: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', rating: 4.5, distance: '1.2km' },
// ];

// const ScaleButton = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => {
//   const scale = new Animated.Value(1);

//   const handlePressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
//   const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

//   return (
//     <Animated.View style={{ transform: [{ scale }] }}>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPressIn={handlePressIn}
//         onPressOut={handlePressOut}
//         onPress={onPress}
//       >
//         {children}
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// export default function ChooseEstablishment() {
//   const router = useRouter();
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const goNext = () => {
//     if (selectedId) {
//       router.push('./NearBy');
//     }
//   };

//   return (
//     <Layout>
//       <View className="flex-1 px-4 pt-8 bg-[#FFF8F0]">
//         {/* Cabeçalho */}
//         <View className="items-center mb-6">
//           <Text className="text-4xl font-extrabold text-gray-900 text-center">ESCOLHA</Text>
//           <Text className="text-2xl text-gray-600 mt-1 text-center">O ESTABELECIMENTO</Text>
//         </View>

//         {/* Lista de estabelecimentos */}
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 160 }}
//           renderItem={({ item, index }) => (
//             <Animatable.View animation="fadeInUp" delay={index * 100}>
//               <ScaleButton onPress={() => setSelectedId(item.id)}>
//                 <View
//                   className={`flex-row items-center bg-white rounded-3xl p-4 mb-5 shadow-sm border ${
//                     selectedId === item.id ? 'border-orange-500' : 'border-gray-200'
//                   }`}
//                 >
//                   <View className="w-24 h-24 rounded-2xl overflow-hidden mr-4">
//                     <Image
//                       source={{ uri: item.link }}
//                       className="w-full h-full"
//                       resizeMode="cover"
//                     />
//                   </View>
//                   <View className="flex-1 justify-center">
//                     <Text className="text-gray-900 text-xl font-bold">{item.title}</Text>
//                     <Text className="text-gray-400 mt-1">
//                       ⭐ {item.rating} • {item.distance}
//                     </Text>
//                   </View>
//                   <View className="bg-orange-500 p-3 rounded-full">
//                     <Text className="text-white font-bold">➔</Text>
//                   </View>
//                 </View>
//               </ScaleButton>
//             </Animatable.View>
//           )}
//         />

//         {/* Botão Próximo fixo */}
//         <View className="absolute bottom-6 left-0 right-0 items-center">
//           <TouchableOpacity
//             onPress={goNext}
//             disabled={!selectedId}
//             activeOpacity={0.9}
//             className={`px-16 py-4 rounded-full ${
//               selectedId ? 'bg-orange-500' : 'bg-gray-300'
//             }`}
//           >
//             <Text className="text-white font-bold text-lg text-center tracking-wide">
//               Próximo
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Layout>
//   );
// }
