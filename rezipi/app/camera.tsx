import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);

  const askForPermission = () => {
    Alert.alert("Camera Permission", "Do you consent to using the camera with this app?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: requestPermission,
      },
    ]);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", paddingBottom: 10 }}>We need your permission to show the camera</Text>
        <Button onPress={askForPermission} title="Grant Permission" color="dark" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView style={{ flex: 1 }} facing={"back"} enableTorch={torch}>
        <View style={styles.container}>
          <View style={{ flex: 1, alignSelf: "flex-end", alignItems: "center", flexDirection: "row", gap: 32 }}>
            <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} onPress={() => setTorch(!torch)}>
              {torch ? <Ionicons name="flash-off" size={24} color="white" /> : <Ionicons name="flash" size={24} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="camera" size={16 * 4} color="lightgrey" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginVertical: 160,
  },
});
