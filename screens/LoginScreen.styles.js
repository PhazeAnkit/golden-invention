// screens/LoginScreen.styles.js
import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subText,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    padding: 15,
    color: colors.text,
    marginBottom: 15,
  },
  forgot: {
    color: colors.primary,
    fontSize: 13,
    textAlign: "right",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#00BFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: colors.subText,
    fontSize: 14,
    textAlign: "center",
  },
  linkHighlight: {
    color: colors.primary,
    fontWeight: "600",
  },
});
