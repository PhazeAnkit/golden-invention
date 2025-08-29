import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import s from "../screens/Dashboard.styles";

export default function MetalMarketCard({ name, price, change, onPress }) {
  const isUp = Number(change) >= 0;
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      <View style={s.cardHeaderRow}>
        <Text style={s.cardTitle}>{name}</Text>
      </View>

      <Text style={s.cardPrice}>${price}</Text>
      <Text
        style={[
          s.cardChange,
          { color: isUp ? colors.positive : colors.negative },
        ]}
      >
        {isUp ? "+" : ""}
        {change}%
      </Text>
    </TouchableOpacity>
  );
}
