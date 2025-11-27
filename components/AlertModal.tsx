import { X } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function AlertModal({ isOpen, onClose, title, message }: AlertModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center p-6">
        <View className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border-2 border-cyan-400 shadow-xl">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-gray-300 text-lg mb-6 leading-relaxed">
            {message}
          </Text>
          
          <TouchableOpacity
            onPress={onClose}
            className="py-3 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 items-center"
          >
            <Text className="text-white font-semibold text-lg">
              ENTENDI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
