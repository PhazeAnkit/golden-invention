import React, { createContext, useState, useEffect } from "react";
import { fetchMetalHistory } from "../services/metalApi";

export const MetalsContext = createContext();

const SUPPORTED_METALS = ["Gold", "Silver", "Platinum", "Palladium"];
// omit Rhodium for free tier

export const MetalsProvider = ({ children }) => {
  const [metals, setMetals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMetals = async () => {
    try {
      setLoading(true);
      const results = [];

      for (const metal of SUPPORTED_METALS) {
        const history = await fetchMetalHistory(metal, "1D");
        if (history && history.length >= 2) {
          const latestObj = history[history.length - 1];
          const prevObj = history[0];

          const latest = (latestObj.y)/31.1035;
          const prev = (prevObj.y)/31.1035;


          if (latest && prev) {
            const change = ((latest - prev) / prev) * 100;

            results.push({
              name: metal,
              price: latest,
              change: parseFloat(change.toFixed(2)),
            });
          }
        }
      }

      setMetals(results);
    } catch (err) {
      console.error("Error fetching metals:", err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchMetals();

  useEffect(() => {
    fetchMetals();
  }, []);

  return (
    <MetalsContext.Provider value={{ metals, loading, refresh }}>
      {children}
    </MetalsContext.Provider>
  );
};
