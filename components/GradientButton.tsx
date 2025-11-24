import { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface GradientButtonProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
}

export default function GradientButton({ children, onPress, className = '' }: GradientButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 shadow-lg active:opacity-80 ${className}`}
    >
      <Text className="text-white font-semibold text-lg text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
