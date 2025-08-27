import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

import DashboardScreen from "./screens/Dashboard";
import PortfolioScreen from "./screens/Portfolio";
import AIHelperScreen from "./screens/AIHelper";
import SplashScreen from "./screens/Splash";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import colors from "./theme/colors";
import MetalDetailScreen from "./screens/MetalDetail";
import BuyScreen from "./screens/Buy";
import SellScreen from "./screens/Sell";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
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
          tabBarIcon: ({ color, size }) => (
            <Icon name="sparkles-outline" color={color} size={size} />
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
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="MetalDetail" component={MetalDetailScreen} />
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Sell" component={SellScreen} />
    </Stack.Navigator>
  );
}
