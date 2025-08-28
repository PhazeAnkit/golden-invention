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
import { useAuth } from "../context/AuthContext";

export default function PortfolioScreen() {
  // Fake holdings (later, update via Buy/Sell flow)
  const holdings = [
    { name: "Gold", qty: 10, avgBuy: 1850, currentPrice: 1925 },
    { name: "Silver", qty: 200, avgBuy: 22, currentPrice: 23.5 },
    { name: "Platinum", qty: 5, avgBuy: 870, currentPrice: 890 },
  ];

  // Portfolio value and growth data
  const totalValue = holdings.reduce(
    (sum, m) => sum + m.qty * m.currentPrice,
    0
  );

  const { logout } = useAuth();

  const portfolioGrowth = [2000, 2500, 2700, 2600, 3000, totalValue]; // fake history

  return (
    <View style={styles.container}>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Portfolio summary */}
      <Text style={styles.heading}>My Portfolio</Text>
      <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
      <Text style={styles.subText}>Total Value</Text>

      {/* Chart */}
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

      {/* Holdings List */}
      <FlatList
        data={holdings}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const currentValue = item.qty * item.currentPrice;
          const invested = item.qty * item.avgBuy;
          const profit = currentValue - invested;
          const profitPct = ((profit / invested) * 100).toFixed(2);

          return (
            <View style={styles.card}>
              <Text style={styles.metal}>{item.name}</Text>
              <Text style={styles.detail}>Qty: {item.qty}</Text>
              <Text style={styles.detail}>
                Avg Buy: ${item.avgBuy.toFixed(2)}
              </Text>
              <Text style={styles.detail}>
                Current: ${item.currentPrice.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.profit,
                  { color: profit >= 0 ? colors.success : colors.negative },
                ]}
              >
                P/L: ${profit.toFixed(2)} ({profitPct}%)
              </Text>
            </View>
          );
        }}
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
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },

  metal: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  detail: { fontSize: 14, color: "#aaa" },
  profit: { fontSize: 16, fontWeight: "600", marginTop: 5 },
});
