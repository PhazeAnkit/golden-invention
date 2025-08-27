import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./components/Dashboard";
import { View, Text, StyleSheet } from "react-native";
import colors from "./theme/colors";

const Stack = createNativeStackNavigator();

const MetalDetailScreen = ({ route }) => {
  const { metal } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>{metal} Details Coming Soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    color: colors.text,
    fontSize: 20,
  },
});

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Detail" component={MetalDetailScreen} />
    </Stack.Navigator>
  );
}
