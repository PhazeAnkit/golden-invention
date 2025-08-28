import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";

export default function Loader({ size = 28, icon = "💰" }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Text style={[styles.spinner, { fontSize: size }]}>{icon}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    textAlign: "center",
  },
});
