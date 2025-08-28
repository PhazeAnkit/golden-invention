// screens/SplashScreen.js
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, ActivityIndicator } from "react-native";
import BrandLogo from "../components/BrandLogo";
import colors from "../theme/colors";
import styles from "./SplashScreen.styles";

export default function SplashScreen() {
  return (
    <LinearGradient colors={["#121212", "#1E1E1E"]} style={styles.container}>
      <BrandLogo size={40} />
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
    </LinearGradient>
  );
}
