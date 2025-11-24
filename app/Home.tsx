import { ActivityIndicator, View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#111111" />
    </View>
  );
}
