import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import colors from "../theme/colors";
import s from "../screens/Dashboard.styles";

// Gradient mapping per metal
const metalGradients = {
  Gold: ["#FFD700", "#FFA500"],       // Yellow → Orange
  Silver: ["#C0C0C0", "#A9A9A9"],     // Light gray → Dark gray
  Platinum: ["#E5E4E2", "#BCC6CC"],   // Platinum shimmer
  Palladium: ["#CED0DD", "#8E9BAE"],  // Blue-gray
  Default: ["#333", "#555"],          // Fallback gradient
};

export default function MetalMarketCard({ name, price, change, onPress }) {
  const isUp = Number(change) >= 0;
  const gradientColors = metalGradients[name] || metalGradients.Default;
  price = price.toFixed(2);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={s.cardWrapper}>
      <LinearGradient colors={gradientColors} style={s.card}>
        <View style={s.cardHeaderRow}>
          <Text style={s.cardTitle}>{name}</Text>
        </View>

        <Text style={s.cardPrice}>₹{price}</Text>
        <Text
          style={[
            s.cardChange,
            { color: isUp ? colors.positive : colors.negative },
          ]}
        >
          {isUp ? "+" : ""}
          {change}%
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
