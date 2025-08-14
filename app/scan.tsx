import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendToBackend = async (uri: string) => {
    setPhotoUri(uri);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", { uri, name: "scan.jpg", type: "image/jpeg" } as any);
      formData.append("age", "25"); 
      formData.append("gender", "male");

      const response = await fetch("http://172.16.44.142:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      router.push({ pathname: "/results", params: { analysis: JSON.stringify(data) } });
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert("Error", "Failed to get analysis from backend.");
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: false });
    if (!result.canceled) sendToBackend(result.assets[0].uri);
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: false });
    if (!result.canceled) sendToBackend(result.assets[0].uri);
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
    <View className="flex-1  justify-center items-center p-4">
      {!loading ? (
        <>
          {photoUri && <Image source={{ uri: photoUri }} className="w-full h-64 mb-4 rounded-lg" />}
          <Text className="text-3xl font-bold mb-6 text-center text-black">Snap or Upload a Photo</Text>

          <TouchableOpacity onPress={takePhoto} style={{ backgroundColor: "rgba(28, 85, 19, 0.6)" }} className=" px-6 py-4 rounded-xl mb-4">
            <Text className="text-black text-lg font-bold">Take Photo →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickFromGallery} style={{ backgroundColor: "rgba(28, 85, 19, 0.6)" }} className=" px-6 py-4 rounded-xl">
            <Text className="text-black text-lg font-bold">Upload from Gallery →</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#16a34a" />
          <Text className="text-black mt-4 text-lg">Analyzing...</Text>
        </View>
      )}
    </View>
    </ImageBackground>
  );
}
