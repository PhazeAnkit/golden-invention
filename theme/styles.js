import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
