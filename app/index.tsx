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
        <Text className="text-4xl font-bold text-center leading-snug text-black">
          Stay Healthy.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-green-700 rounded-lg px-8 py-4"
        onPress={() => router.push("/auth/login")}
      >
        <Text className="text-white text-lg font-semibold">Get Started →</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
