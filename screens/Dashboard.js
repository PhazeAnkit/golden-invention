import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MetalsContext } from "../context/MetalsContext";

// Dashboard components
import DashboardHeader from "../components/DashboardHeader";
import QuickActionsRow from "../components/QuickActionsRow";
import PortfolioSummaryCard from "../components/PortfolioSummaryCard";
import MetalMarketCard from "../components/MetalMarketCard";

// Styles
import styles from "./Dashboard.styles";

const DashboardScreen = ({ navigation }) => {
  const { metals, loading, refresh } = useContext(MetalsContext);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <DashboardHeader onRefresh={refresh} loading={loading} />

        {/* Quick Actions */}
        <QuickActionsRow
          onBuy={() => navigation.navigate("Buy")}
          onSell={() => navigation.navigate("Sell")}
          onAI={() => navigation.navigate("AIHelper")}
          onSearch={() => {}}
        />

        {/* Portfolio Summary */}
        <PortfolioSummaryCard
          balance={12340.0}
          pnl={2.3}
          sparkline={[11, 12, 10, 12.5, 13.2, 13.8, 13.5]}
        />

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <View style={styles.dot} />
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionTitleBar} />
          </View>
        </View>

        {/* Market Grid */}
        <View style={styles.grid}>
          {(metals || []).map((m, i) => (
            <MetalMarketCard
              key={m.name + i}
              name={m.name}
              price={m.price}
              change={m.change}
              onPress={() =>
                navigation.navigate("MetalDetail", { metal: m, defaultRange: "1D" })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
