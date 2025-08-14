import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type AnalysisData = {
  predicted_food?: string;
  probability?: number;
  nutrients_present?: Record<string, number | string>;
  missing_nutrients_links?: Record<string, string[]>;
};

export default function ResultsScreen() {
  const { analysis } = useLocalSearchParams<{ analysis?: string }>();
  let data: AnalysisData | null = null;

  try {
    data = analysis ? JSON.parse(analysis) : null;
  } catch (e) {
    console.error("Failed to parse analysis:", e);
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-red-500 font-semibold">
          No analysis data available
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView
        className="p-5 pt-12"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        <View className="bg-white/90 rounded-2xl p-5 shadow-lg mb-6">
          <Text className="text-2xl font-extrabold text-center text-green-700">
            {data.predicted_food ?? "Unknown"}
          </Text>
        </View>

        
        <Text className="text-xl font-semibold text-gray-800 mb-3">
          Nutrients Present:
        </Text>
        <View className="flex-row flex-wrap">
          {data.nutrients_present &&
            Object.entries(data.nutrients_present).map(([key, value]) => (
              <View
                key={key}
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                className="bg-green-100 rounded-full px-4 py-2 mr-2 mb-2 shadow-sm"
              >
                <Text className="text-green-900 font-medium text-sm">
                  {key}: {String(value)}
                </Text>
              </View>
            ))}
        </View>

        <Text className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          Missing Nutrients Links:
        </Text>
        {data.missing_nutrients_links &&
          Object.entries(data.missing_nutrients_links).map(
            ([nutrient, links]) => (
              <View
                key={nutrient}
                className="bg-white rounded-2xl overflow-hidden mb-5 shadow-md"
              >
                <View className="p-4">
                  <Text className="text-lg font-bold text-gray-800 mb-3">
                    {nutrient}
                  </Text>
                  {links.map((link) => (
                    <TouchableOpacity
                      key={link}
                      onPress={() => Linking.openURL(link)}
                      className="mb-2"
                      activeOpacity={0.7}
                    >
                      <Text className="text-green-700">
                        {link}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )
          )}
      </ScrollView>
    </ImageBackground>
  );
}
