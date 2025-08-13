import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Replace with backend API call
    if (username && password) {
      console.log("Logging in with:", username, password);
      router.push("/"); // redirect after successful login
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 items-center justify-center px-6"
      >
        {/* Title */}
        <Text className="text-4xl font-bold mb-6">LOGIN</Text>

        {/* Input container */}
        <View className="bg-green-700/80 p-6 rounded-2xl w-full max-w-sm">
          <Text className="text-white font-bold mb-2">Username:</Text>
          <TextInput
            className="bg-white rounded-md px-4 py-2 mb-4"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />

          <Text className="text-white font-bold mb-2">Password:</Text>
          <TextInput
            className="bg-white rounded-md px-4 py-2 mb-6"
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-green-700 py-3 rounded-md items-center"
          >
            <Text className="text-white font-bold">LOGIN →</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up link */}
        <View className="mt-4 flex-row">
          <Text className="text-black font-semibold">
            Don’t Have An Account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text className="text-green-700 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
