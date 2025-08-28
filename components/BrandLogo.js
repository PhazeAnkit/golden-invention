import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function BrandLogo({ size = 36 }) {
  return <Text style={[styles.logo, { fontSize: size }]}>PreciousX</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "bold",
    color: colors.primary,
    letterSpacing: 1,
    textShadowColor: "#00BFFF55",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
