import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../theme/colors";
import s from "../screens/Dashboard.styles";

const Action = ({ icon, label, onPress }) => (
  <TouchableOpacity style={s.quickAction} onPress={onPress}>
    <Icon name={icon} size={18} color={colors.text} />
    <Text style={s.quickActionText}>{label}</Text>
  </TouchableOpacity>
);

export default function QuickActionsRow({ onBuy, onSell, onAI, onSearch }) {
  return (
    <View style={s.quickRow}>
      <Action icon="search" label="Search" onPress={onSearch} />
      <Action icon="add-circle-outline" label="Buy" onPress={onBuy} />
      <Action icon="remove-circle-outline" label="Sell" onPress={onSell} />
      <Action icon="sparkles-outline" label="AI" onPress={onAI} />
    </View>
  );
}
