import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../theme/colors";
import { usePortfolio } from "../context/PortfolioContext";

export default function PortfolioScreen({ navigation }) {
  const { holdings } = usePortfolio();

  const safeHoldings = Array.isArray(holdings) ? holdings : [];

  const totalValue = safeHoldings.reduce((sum, m) => {
    const qty = Number(m.qty) || 0;
    const price = Number(m.currentPrice) || 0;
    return sum + qty * price;
  }, 0);

  const portfolioGrowth = [
    2000,
    2500,
    2700,
    2600,
    3000,
    Number(totalValue) || 0,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Portfolio</Text>
      <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
      <Text style={styles.subText}>Total Value</Text>

      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Now"],
          datasets: [{ data: portfolioGrowth }],
        }}
        width={Dimensions.get("window").width - 30}
        height={180}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          color: () => colors.primary,
          labelColor: () => "#aaa",
          strokeWidth: 2,
        }}
        bezier
        style={styles.chart}
      />

      <FlatList
        data={safeHoldings}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const qty = Number(item.qty) || 0;
          const currentPrice = Number(item.currentPrice) || 0;
          const invested = Number(item.totalCost) || 0;
          const currentValue = qty * currentPrice;
          const profit = currentValue - invested;
          const profitPct =
            invested > 0 ? ((profit / invested) * 100).toFixed(2) : "0.00";

          const avgBuy = qty > 0 ? invested / qty : 0;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("MetalDetail", {
                  metal: {
                    name: item.name,
                    price: currentPrice,
                    change: 0,
                  },
                })
              }
            >
              <Text style={styles.metal}>{item.name}</Text>
              <Text style={styles.detail}>Qty: {qty}</Text>
              <Text style={styles.detail}>Avg Buy: ${avgBuy.toFixed(2)}</Text>
              <Text style={styles.detail}>
                Current: ${currentPrice.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.profit,
                  { color: profit >= 0 ? colors.success : colors.negative },
                ]}
              >
                P/L: ${profit.toFixed(2)} ({profitPct}%)
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: "#777", textAlign: "center", marginTop: 12 }}>
            No holdings yet. Use Buy on a metal to get started.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  heading: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  value: { fontSize: 28, fontWeight: "bold", color: colors.primary },
  subText: { color: "#aaa", marginBottom: 15 },
  chart: { marginVertical: 10, borderRadius: 10 },
  card: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  metal: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  detail: { fontSize: 14, color: "#aaa" },
  profit: { fontSize: 16, fontWeight: "600", marginTop: 5 },
});
