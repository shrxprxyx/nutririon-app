import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://172.16.44.142:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        router.push("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 50,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-5xl font-semibold mb-6 text-black text-center">
            LOGIN
          </Text>

          <View
            style={{ backgroundColor: "rgba(28, 85, 19, 0.6)" }}
            className="p-5 pt-5 rounded-2xl mb-3 h-100"
          >
            <Text className="text-white font-bold mb-2">Username:</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
                marginBottom: 12,
              }}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />

            <Text className="text-white mt-4 font-bold mb-2">Password:</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
                marginBottom: 20,
              }}
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              className="bg-transparent border border-white rounded-lg py-3 mt-2 items-center"
              onPress={handleLogin}
            >
              <Text className="text-white text-lg font-bold">LOGIN ➜</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-2">
            <Text className="text-black text-sm text-center">
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#4E900C] font-semibold"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
