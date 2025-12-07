// QRScanner.tsx
import { CameraView, PermissionStatus, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface QRScannerProps {
  visible: boolean;
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function QRScanner({ visible, onScan, onClose }: QRScannerProps) {
  const [manualInput, setManualInput] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const openCamera = async () => {
    if (permission?.status !== PermissionStatus.GRANTED) {
      const resp = await requestPermission();
      if (!resp.granted) return;
    }
    setShowCamera(true);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!data) return;
    onScan(data);
    setShowCamera(false);
  };

  const handleManualSubmit = () => {
    const value = manualInput.trim();
    if (value) {
      onScan(value);
      setManualInput("");
      setShowCamera(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      {showCamera ? (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          <TouchableOpacity onPress={() => setShowCamera(false)} style={{ position: "absolute", top: 40, left: 20, backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 5 }}>
            <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>✖️</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Número da Mesa</Text>
                <Text style={styles.subtitle}>Escaneie o QR Code ou insira manualmente</Text>

                <TextInput
                  value={manualInput}
                  onChangeText={setManualInput}
                  placeholder="Ex: Mesa 5"
                  placeholderTextColor="#999"
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={handleManualSubmit}
                />

                <TouchableOpacity onPress={handleManualSubmit} style={styles.btnConfirm}>
                  <Text style={styles.btnText}>CONFIRMAR MESA</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openCamera} style={styles.btnCamera}>
                  <Text style={styles.btnText}>📱 ABRIR CÂMERA</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContent: { width: "100%", maxWidth: 350, backgroundColor: "#222", borderRadius: 20, padding: 20 },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeText: { color: "white", fontSize: 20 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  subtitle: { color: "#aaa", fontSize: 14, textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#333", color: "white", borderRadius: 8, padding: 12, marginBottom: 15 },
  btnConfirm: { backgroundColor: "#0ea5e9", padding: 15, borderRadius: 8, marginBottom: 10, alignItems: "center" },
  btnCamera: { backgroundColor: "#10b981", padding: 15, borderRadius: 8, alignItems: "center" },
  btnText: { color: "white", fontSize: 16, fontWeight: "600" },
});
