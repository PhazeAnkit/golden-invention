import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

const MetalCard = ({ metal, price, change, onPress }) => {
  const isPositive = change >= 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.metalName}>{metal}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text
        style={[
          styles.change,
          { color: isPositive ? colors.positive : colors.negative },
        ]}
      >
        {isPositive ? `+${change}%` : `${change}%`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  metalName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginTop: 6,
  },
  change: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
});

export default MetalCard;
