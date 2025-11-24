import React, { useState } from "react";
import { Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface QRScannerProps {
  visible: boolean;
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function QRScanner({ visible, onScan, onClose }: QRScannerProps) {
  const [manualInput, setManualInput] = useState("");

  const handleManualSubmit = () => {
    const value = manualInput.trim();
    if (value) {
      onScan(value);
      setManualInput("");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      {/* Backdrop + dismiss on press outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="absolute inset-0 bg-black/80" />
      </TouchableWithoutFeedback>

      <View className="flex-1 justify-center items-center px-6">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl">
            {/* Close button */}
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4 p-2 rounded-full"
              accessibilityLabel="Fechar scanner"
            >
              <Text className="text-white text-xl">✖️</Text>
            </TouchableOpacity>

            {/* Icon */}
            <View className="items-center justify-center mb-4">
              <Text className="text-cyan-400 text-5xl">📷</Text>
            </View>

            <Text className="text-white text-2xl font-bold text-center mb-2">
              Scanner de QR Code
            </Text>

            <Text className="text-gray-400 text-center mb-6">
              Escaneie o QR Code da mesa ou insira o número manualmente
            </Text>

            {/* Manual input */}
            <View className="mb-4">
              <Text className="text-white text-sm font-semibold mb-2">Número da Mesa</Text>
              <TextInput
                value={manualInput}
                onChangeText={setManualInput}
                placeholder="Ex: Mesa 5"
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                onSubmitEditing={handleManualSubmit}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </View>

            <TouchableOpacity
              onPress={handleManualSubmit}
              className="w-full py-4 rounded-full bg-cyan-500 items-center justify-center mb-3"
              accessibilityLabel="Confirmar mesa"
            >
              <Text className="text-white text-lg font-semibold">CONFIRMAR MESA</Text>
            </TouchableOpacity>

            <View className="mt-2 p-3 bg-gray-800 rounded-lg">
              <Text className="text-gray-400 text-sm text-center">
                💡 Em produção, a câmera escanearia o QR Code da mesa automaticamente
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
