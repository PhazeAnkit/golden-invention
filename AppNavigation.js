import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./screens/Dashboard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "./theme/colors";
import Icon from "react-native-vector-icons/Ionicons";
import PortfolioScreen from "./screens/Portfolio";
import AIHelperScreen from "./screens/AIHelper";
import SplashScreen from "./screens/Splash";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomAIButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={styles.aiButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 65,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AIHelper"
        component={AIHelperScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="sparkles-outline"
              color={focused ? "#fff" : "#000"}
              size={28}
            />
          ),
          tabBarButton: (props) => (
            <CustomAIButton {...props}>
              <Icon name="sparkles" color="#fff" size={28} />
            </CustomAIButton>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  aiButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 65,
    height: 65,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
