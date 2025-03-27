import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const ref = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [torch, setTorch] = useState(false);

  const postPicture = async (uri: string) => {
    const formData = new FormData();

    // Append file to the form data
    formData.append("file", {
      uri,
      name: "ingredients.jpg", // You can customize the filename
      type: "image/jpeg", // Make sure the file type matches the uploaded file
    } as any);

    try {
      // Make the POST request to upload the file
      const response = await fetch("http://192.168.129.7:8000/uploadfile", {
        method: "POST",
        body: formData,
        // No need to set Content-Type here but still for reference
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data);
      } else {
        console.error("Upload failed with status:", response.status);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo) {
      setUri(photo.uri);
      postPicture(photo.uri);
    }
  };

  const askForPermission = () => {
    Alert.alert("Camera Permission", "Do you consent to use your camera with this app?", [
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

  const renderCamera = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <CameraView style={{ flex: 1 }} ref={ref} facing={"back"} enableTorch={torch}>
          <View style={styles.container}>
            <View style={{ flex: 1, alignSelf: "flex-end", alignItems: "center", flexDirection: "row", gap: 32 }}>
              <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} onPress={() => setTorch(!torch)}>
                {torch ? <Ionicons name="flash-off" size={24} color="white" /> : <Ionicons name="flash" size={24} color="white" />}
              </TouchableOpacity>
              <TouchableOpacity onPress={takePicture}>
                <Ionicons name="camera" size={16 * 4} color="lightgrey" />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
          </View>
        </CameraView>
      </View>
    );
  };

  const renderPicture = () => {
    return (
      <View>
        <Image source={{ uri }} contentFit="contain" style={{ width: 300, aspectRatio: 1 }} />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  return <View style={{ flex: 1, justifyContent: "center" }}>{uri ? renderPicture() : renderCamera()}</View>;
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
