import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../theme/colors";

const screenWidth = Dimensions.get("window").width;

export default function MetalDetailScreen({ route, navigation }) {
  const { metal } = route.params;
  const [range, setRange] = useState("1D");

  const priceHistory = [
    { x: 1, y: 1800 },
    { x: 2, y: 1810 },
    { x: 3, y: 1790 },
    { x: 4, y: 1820 },
  ];

  const recentTransactions = [
    { id: "1", type: "Buy", qty: "2g", value: "$120", date: "2025-08-20" },
    { id: "2", type: "Sell", qty: "1g", value: "$60", date: "2025-08-22" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{metal.name}</Text>
        <TouchableOpacity>
          <Text style={styles.favorite}>⭐</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>${metal.price}</Text>
      <Text style={styles.change}>
        {metal.change > 0 ? `+${metal.change}%` : `${metal.change}%`}
      </Text>

      <LineChart
        data={{
          labels: priceHistory.map((p) => p.x.toString()),
          datasets: [{ data: priceHistory.map((p) => p.y) }],
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

      <View style={styles.rangeContainer}>
        {["1D", "1W", "1M", "1Y"].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.rangeButton, range === r && styles.rangeActive]}
            onPress={() => setRange(r)}
          >
            <Text style={{ color: range === r ? "#fff" : "#aaa" }}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Buy", { metal })}
        >
          <Text style={styles.actionText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.negative }]}
          onPress={() => navigation.navigate("Sell", { metal })}
        >
          <Text style={styles.actionText}>Sell</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.txnRow}>
            <Text
              style={{
                color: item.type === "Buy" ? colors.success : colors.negative,
              }}
            >
              {item.type}
            </Text>
            <Text>{item.qty}</Text>
            <Text>{item.value}</Text>
            <Text style={{ color: "#aaa" }}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: { fontSize: 20, color: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  favorite: { fontSize: 20, color: "#FFD700" },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  change: {
    fontSize: 16,
    textAlign: "center",
    color: "#39FF14",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
    marginVertical: 10,
    alignSelf: "center",
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  rangeButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: "#222",
  },
  rangeActive: { backgroundColor: colors.primary },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  actionBtn: {
    flex: 1,
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  txnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
});
