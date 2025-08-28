import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import colors from "../theme/colors";
import { usePortfolio } from "../context/PortfolioContext";
import MetalChart from "../components/MetalChart";
import { fetchMetalHistory } from "../services/metalApi";

const screenWidth = Dimensions.get("window").width;

export default function MetalDetailScreen({ route, navigation }) {
  const { metal } = route.params;
  const [range, setRange] = useState("1D");
  const { holdings, transactions } = usePortfolio();

  const holding = holdings.find((h) => h.name === metal.name);
  const currentPrice = Number(holding?.currentPrice ?? metal.price) || 0;
  const ownedQty = Number(holding?.qty) || 0;
  const invested = Number(holding?.totalCost) || 0;
  const avgBuy = ownedQty > 0 ? invested / ownedQty : 0;

  const metalTxns = useMemo(
    () => transactions.filter((t) => t.metal === metal.name),
    [transactions, metal.name]
  );

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [range]);

  const loadHistory = async () => {
    setLoading(true);
    const data = await fetchMetalHistory(metal.name, range);
    setHistory(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{metal.name}</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Price */}
      <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
      <Text style={styles.change}>
        {metal.change > 0 ? `+${metal.change}%` : `${metal.change}%`}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <MetalChart title={`${metal.name} Price (${range})`} data={history} />
      )}

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

      <View style={styles.position}>
        <Text style={styles.posText}>Owned: {ownedQty}</Text>
        <Text style={styles.posText}>Avg Buy: ${avgBuy.toFixed(2)}</Text>
        <Text style={styles.posText}>Invested: ${invested.toFixed(2)}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={() =>
            navigation.navigate("Buy", {
              metal: { name: metal.name, price: currentPrice },
            })
          }
        >
          <Text style={styles.actionText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.negative }]}
          onPress={() =>
            navigation.navigate("Sell", {
              metal: { name: metal.name, price: currentPrice },
            })
          }
        >
          <Text style={styles.actionText}>Sell</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={metalTxns}
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
            <Text>{item.qty}g</Text>
            <Text>${Number(item.value).toFixed(2)}</Text>
            <Text style={{ color: "#aaa" }}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#777", textAlign: "center" }}>
            No transactions yet.
          </Text>
        }
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
  position: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    marginBottom: 6,
  },
  posText: { color: "#ddd" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
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
