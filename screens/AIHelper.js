import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function AiAssistantScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello 👋 I’m your AI trading assistant. Ask me anything about gold, silver, or portfolio!",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);

    // Temporary AI reply (later we hook up to real AI API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `🤖 This is a placeholder reply about "${input}".`,
          sender: "ai",
        },
      ]);
    }, 1000);

    setInput("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMsg : styles.aiMsg,
      ]}
    >
      <Text style={styles.msgText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.header}>AI Advisor</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chat}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about metals or portfolio..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 12,
    backgroundColor: colors.card,
  },
  chat: { padding: 15 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: colors.card,
  },
  msgText: { color: "#fff", fontSize: 15 },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.card,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#fff",
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
