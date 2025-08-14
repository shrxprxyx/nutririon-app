import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-transparent pt-10">
        
        <View
          style={{ backgroundColor: "rgba(28, 85, 19, 0.6)" }}
          className="flex-row justify-between items-center px-4 py-3 border-b border-[#1C5513]"
        >
          
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-[#1C5513] justify-center items-center">
              <Ionicons name="person-outline" size={28} color="black" />
            </View>
            <View className="ml-3">
              <Text className="text-lg font-bold text-white">Name: Shrii</Text>
              <Text className="text-sm text-white">Age: 19</Text>
            </View>
          </View>

         
          <TouchableOpacity
            className="flex-row items-center border border-black rounded-lg px-3 py-1"
            onPress={() => router.replace("/auth/login")}
          >
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text className="ml-1 text-black">Logout</Text>
          </TouchableOpacity>
        </View>

       
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Main Content */}
          <View className="justify-center items-center px-4 mt-8">
            <Text className="text-3xl font-bold mb-6 text-black text-center">
              NutriGap
            </Text>

            <TouchableOpacity
            style={{ backgroundColor: "rgba(28, 85, 19, 0.6)" }}
              className="px-6 py-3 rounded-lg mb-6 "
              onPress={() => router.push("/scan")}
            >
              <Text className="text-black font-bold text-lg text-center">
                Quick Scan
              </Text>
            </TouchableOpacity>
          </View>

          
          <View className="flex-row justify-between px-4 mb-6">
            <View className="bg-white/80 p-4 rounded-lg w-[48%] items-center shadow-md">
              <Text className="font-bold text-lg">Scans Today</Text>
              <Text className="text-2xl mt-2">5</Text>
            </View>
            <View className="bg-white/80 p-4 rounded-lg w-[48%] items-center shadow-md">
              <Text className="font-bold text-lg">Calories Logged</Text>
              <Text className="text-2xl mt-2">2300</Text>
            </View>
          </View>

          
          <View className="px-4 mb-6">
            <Text className="text-black font-bold text-lg mb-2">Recent Scans</Text>
            <View className="bg-white/80 p-3 rounded-lg mb-2">
              <Text>12 Aug - Banana Shake</Text>
            </View>
            <View className="bg-white/80 p-3 rounded-lg mb-2">
              <Text>11 Aug - Oatmeal Breakfast</Text>
            </View>
            <View className="bg-white/80 p-3 rounded-lg mb-2">
              <Text>10 Aug - Salad</Text>
            </View>
          </View>

          <View className="px-6 mt-6 mb-10">
            <Text className="text-center text-black italic text-lg">
              "Eat well, stay active, stay healthy!"
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
