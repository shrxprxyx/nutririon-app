import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// If you have a stack param list
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-3xl font-bold mb-6 text-black">REGISTER</Text>

        <View className="w-full bg-[rgba(55,94,47,0.9)] rounded-xl p-5">
          <Text className="text-white text-base mb-1">Mobile Number:</Text>
          <TextInput
            className="bg-[#F9F7F1] rounded-lg px-3 py-2 mb-4 text-base"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
          />

          <Text className="text-white text-base mb-1">Username:</Text>
          <TextInput
            className="bg-[#F9F7F1] rounded-lg px-3 py-2 mb-4 text-base"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />

          <Text className="text-white text-base mb-1">Password:</Text>
          <TextInput
            className="bg-[#F9F7F1] rounded-lg px-3 py-2 mb-4 text-base"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />

          <TouchableOpacity className="bg-transparent border border-white rounded-lg py-3 mt-2 items-center">
            <Text className="text-white text-lg font-bold">REGISTER ➜</Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-sm text-black">
          Already Have An Account?{" "}
          <Text
            className="text-green-700 font-bold"
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
