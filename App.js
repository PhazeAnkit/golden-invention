import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigation";
import { PortfolioProvider } from "./context/PortfolioContext";
import { AuthProvider } from "./context/AuthContext";
import { MetalsContext, MetalsProvider } from "./context/MetalsContext";

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <MetalsProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </MetalsProvider>
      </PortfolioProvider>
    </AuthProvider>
  );
}
