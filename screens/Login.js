import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginScreen.styles";
import BrandLogo from "../components/BrandLogo";
import { SafeAreaView, useColorScheme, StatusBar } from "react-native";

export default function LoginScreen({ navigation }) {
  const scheme = useColorScheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    login(email);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: scheme === "dark" ? "#000000" : "#FFFFFF",
      }}
    >
      <StatusBar />

      <LinearGradient
        colors={["#121212", "#1E1E1E", "#0A0A0A"]}
        style={styles.container}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.inner}>
          <BrandLogo size={42} />

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>
              Don’t have an account?{" "}
              <Text style={styles.linkHighlight}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
