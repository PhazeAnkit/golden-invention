import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import s from "../screens/Dashboard.styles";
import colors from "../theme/colors";
import { Dimensions } from "react-native";

const width = Math.min(Dimensions.get("window").width - 40, 420);

export default function PortfolioSummaryCard({ balance, pnl, sparkline = [] }) {
  const positive = pnl >= 0;
  return (
    <View style={s.portfolioCard}>
      <View style={s.portfolioTop}>
        <View>
          <Text style={s.portfolioLabel}>Portfolio Balance</Text>
          <Text style={s.portfolioValue}>${balance.toLocaleString()}</Text>
        </View>
        <Text
          style={[
            s.portfolioPnl,
            { color: positive ? colors.positive : colors.negative },
          ]}
        >
          {positive ? "+" : ""}
          {pnl}%
        </Text>
      </View>

      <LineChart
        data={{
          labels: new Array(sparkline.length).fill(""),
          datasets: [{ data: sparkline }],
        }}
        width={width}
        height={110}
        yAxisLabel=""
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        chartConfig={{
          backgroundGradientFrom: "transparent",
          backgroundGradientTo: "transparent",
          decimalPlaces: 2,
          color: () => colors.primary,
          labelColor: () => "transparent",
        }}
        style={s.portfolioChart}
        bezier
      />
    </View>
  );
}
