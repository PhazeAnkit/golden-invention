import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigation";
import { PortfolioProvider } from "./context/PortfolioContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PortfolioProvider>
    </AuthProvider>
  );
}
