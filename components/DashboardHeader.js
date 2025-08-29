import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../theme/colors";
import s from "../screens/Dashboard.styles";

export default function DashboardHeader({ onRefresh, loading }) {
  return (
    <View style={s.header}>
      <View>
        <Text style={s.greet}>Welcome back,</Text>
        <Text style={s.greetName}>Investor 👋</Text>
      </View>

      <View style={s.headerRight}>
        <TouchableOpacity
          accessibilityLabel="Refresh prices"
          style={s.iconBtn}
          onPress={onRefresh}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Icon name="refresh" size={18} color={colors.primary} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[s.iconBtn, { marginLeft: 10 }]}>
          <Icon name="person-circle-outline" size={26} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
