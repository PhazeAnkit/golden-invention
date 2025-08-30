import { METAL_SYMBOL_MAP } from "./metalSymbols";

const API_KEY = "8305f6c1801eec6b2c3aa3187e0d6ceb"; // move to .env later

export async function fetchMetalHistory(
  metalNameOrSymbol,
  range = "1D",
  base = "INR"
) {
  try {
    let sym = "INR"+metalNameOrSymbol?.toUpperCase?.();
    if (METAL_SYMBOL_MAP[metalNameOrSymbol?.toLowerCase?.()]) {
      sym = METAL_SYMBOL_MAP[metalNameOrSymbol.toLowerCase()];
    }

    if (!sym) {
      throw new Error(`Unknown metal: ${metalNameOrSymbol}`);
    }

    const today = new Date();
    let startDate = new Date(today);

    if (range === "1D") startDate.setDate(today.getDate() - 1);
    else if (range === "1W") startDate.setDate(today.getDate() - 5);
    else if (range === "1M") startDate.setDate(today.getDate() - 5);
    else if (range === "1Y") startDate.setDate(today.getDate() - 5);

    const start = startDate.toISOString().split("T")[0];
    const end = today.toISOString().split("T")[0];

    const url = `https://api.metalpriceapi.com/v1/timeframe?api_key=${API_KEY}&start_date=${start}&end_date=${end}&base=${base}&currencies=${sym}`;

    console.log("[metalApi] fetchMetalHistory():", {
      metalNameOrSymbol,
      resolvedSymbol: sym,
      range,
      start,
      end,
      url,
    });

    const res = await fetch(url);
    console.log("[metalApi] HTTP ok?", res.ok, "status:", res);

    const json = await res.json();
    console.log("[metalApi] JSON top-level keys:", json);

    if (!json.success) {
      console.error("[metalApi] API reported failure:", json);
      return null;
    }

    const prices = json.rates
      ? Object.entries(json.rates).map(([date, data]) => ({
          x: date,
          y: data["INR"+sym],
        }))
      : [];

    return prices;
  } catch (err) {
    console.error("[metalApi] Error fetching history:", err);
    return null;
  }
}
