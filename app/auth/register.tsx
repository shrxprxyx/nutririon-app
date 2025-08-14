import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!mobile || !username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://172.16.44.142:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: mobile,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        router.push("/auth/login");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center px-5">
          <Text className="text-3xl font-bold mb-6 text-black">REGISTER</Text>

          <View className="w-full bg-[rgba(28,85,19,0.6)] rounded-2xl p-5 ">
            <Text className="text-[#FFFCF2] text-base mb-1">Mobile Number:</Text>
            <TextInput
              className="bg-[#F9F7F1] rounded-lg px-3 py-2 mb-4 h-12 text-base"
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
            />

            <Text className="text-[#FFFCF2] text-base mb-1">Username:</Text>
            <TextInput
              className="bg-[#F9F7F1] rounded-lg px-3 h-12 py-2 mb-4 text-base"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />

            <Text className="text-[#FFFCF2] text-base mb-1">Password:</Text>
            <TextInput
              className="bg-[#F9F7F1] rounded-lg h-12 px-3 py-2 mb-4 text-base"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
            />

            <TouchableOpacity
              className="bg-transparent border border-white rounded-lg py-3 mt-2 items-center"
              onPress={handleRegister}
            >
              <Text className="text-white text-lg font-bold">REGISTER ➜</Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-4 text-sm text-black">
            Already Have An Account?{" "}
            <Text
              className="text-green-700 font-bold"
              onPress={() => router.push("/auth/login")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
