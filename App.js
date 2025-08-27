import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { PortfolioProvider } from "./context/PortfolioContext";

export default function App() {
  return (
    <PortfolioProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PortfolioProvider>
  );
}
