import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../theme/colors";

const screenWidth = Dimensions.get("window").width;

export default function MetalChart({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: data.map((d) => d.x).slice(-6),
          datasets: [{ data: data.map((d) => d.y) }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#111",
          backgroundGradientTo: "#111",
          decimalPlaces: 2,
          color: (opacity = 1) => colors.primary,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: colors.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
    marginVertical: 10,
    alignSelf: "center",
  },
  empty: { padding: 20, alignItems: "center" },
  emptyText: { color: "#aaa" },
});
