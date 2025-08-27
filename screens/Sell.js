import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import { usePortfolio } from "../context/PortfolioContext";

export default function SellScreen({ route, navigation }) {
  const { metal } = route.params;
  const { sellMetal } = usePortfolio();
  const [qty, setQty] = useState("");

  const handleSell = () => {
    const amount = parseFloat(qty);
    if (!isNaN(amount) && amount > 0) {
      sellMetal(metal, amount);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell {metal.name}</Text>
      <Text style={styles.price}>Current Price: ${metal.price}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.negative }]} onPress={handleSell}>
        <Text style={styles.btnText}>Confirm Sell</Text>
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
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
