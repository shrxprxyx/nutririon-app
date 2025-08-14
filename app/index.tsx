import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Landing() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      className="flex-1 justify-center items-center px-4"
      resizeMode="cover"
    >
      <View className="mb-8">
        <Text className="text-4xl font-bold text-center leading-snug text-black">
          Snap. Scan.
        </Text>
        <Text className="text-4xl font-bold text-center leading-snug text-">
          Stay Healthy.
        </Text>
      </View>

      <TouchableOpacity
        className="rounded-lg px-8 py-4 flex-row items-center justify-center"
        style={{ backgroundColor: "rgba(28,85,19,0.7)" }}
        onPress={() => router.push("/auth/login")}
        accessible
        accessibilityLabel="Register and go to login"
      >
        <Text className="text-white text-lg font-bold mr-2">Get Started</Text>
        <Text className="text-white text-lg font-bold">→</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
