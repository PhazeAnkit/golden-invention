import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../theme/colors";
import MetalCard from "../components/MetalCard";

const DashboardScreen = ({ navigation }) => {
  const metals = [
    { name: "Gold", price: 1925, change: 1.2 },
    { name: "Silver", price: 23.5, change: -0.8 },
    { name: "Platinum", price: 890, change: 0.4 },
    { name: "Palladium", price: 1250, change: -1.1 },
    { name: "Rhodium", price: 4950, change: 0.9 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {metals.map((metal, index) => (
        <MetalCard
          key={index}
          metal={metal.name}
          price={metal.price}
          change={metal.change}
            onPress={() => navigation.navigate("MetalDetail", { metal })}        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
  },
});

export default DashboardScreen;
