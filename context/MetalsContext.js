import React, { createContext, useState, useEffect } from "react";

// Create Context
export const MetalsContext = createContext();

export const MetalsProvider = ({ children }) => {
  const [metals, setMetals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMetals = async () => {
    try {
      setLoading(true);
      const data = [
        { name: "Gold", price: 1925, change: 1.2 },
        { name: "Silver", price: 23.5, change: -0.8 },
        { name: "Platinum", price: 890, change: 0.4 },
        { name: "Palladium", price: 1250, change: -1.1 },
        { name: "Rhodium", price: 4950, change: 0.9 },
      ];
      setMetals(data);
    } catch (err) {
      console.error("Error fetching metals:", err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchMetals();
  };

  useEffect(() => {
    fetchMetals();
  }, []);

  return (
    <MetalsContext.Provider
      value={{
        metals,
        loading,
        refresh,
      }}
    >
      {children}
    </MetalsContext.Provider>
  );
};
