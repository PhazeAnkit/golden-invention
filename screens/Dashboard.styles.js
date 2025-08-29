import { StyleSheet, Dimensions } from "react-native";
import colors from "../theme/colors";

const W = Dimensions.get("window").width;
const CARD = (W - 16 * 2 - 12) / 2;

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    marginBottom: 8,
  },
  greet: { color: colors.subText, fontSize: 14 },
  greetName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },
  headerRight: { flexDirection: "row", alignItems: "center" },
  iconBtn: {
    backgroundColor: colors.card,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 8,
  },
  quickAction: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  quickActionText: { marginTop: 6, color: colors.text, fontSize: 12 },

  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  sectionTitleWrap: { flex: 1, height: 10, justifyContent: "center" },
  sectionTitleBar: {
    height: 2,
    backgroundColor: colors.card,
    borderRadius: 2,
  },
  portfolioCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  portfolioTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  portfolioLabel: { color: colors.subText, fontSize: 12 },
  portfolioValue: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  portfolioPnl: { fontSize: 14, fontWeight: "700" },
  portfolioChart: { marginTop: 6, alignSelf: "center" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  card: {
    width: CARD,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: "700" },
  cardPrice: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  cardChange: { marginTop: 6, fontSize: 14, fontWeight: "700" },
});
