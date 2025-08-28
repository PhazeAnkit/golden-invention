import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../theme/colors";
import { usePortfolio } from "../context/PortfolioContext";

export default function BuyScreen({ route, navigation }) {
  const { metal } = route.params; 
  const { buyMetal } = usePortfolio();
  const [qty, setQty] = useState("");

  const handleBuy = () => {
    const amount = parseFloat(qty);
    if (!isNaN(amount) && amount > 0) {
      buyMetal(metal, amount);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy {metal.name}</Text>
      <Text style={styles.price}>
        Current Price: ${Number(metal.price).toFixed(2)}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />

      <TouchableOpacity style={styles.btn} onPress={handleBuy}>
        <Text style={styles.btnText}>Confirm Buy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  price: { fontSize: 18, color: "#ccc", marginBottom: 20 },
  input: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
