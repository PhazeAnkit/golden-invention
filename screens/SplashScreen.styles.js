// screens/SplashScreen.styles.js
import { StyleSheet } from "react-native";
import globalStyles from "../theme/styles";

export default StyleSheet.create({
  container: {
    ...globalStyles.flexCenter,
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
});
