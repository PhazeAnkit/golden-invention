import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [holdings, setHoldings] = useState({});
  const [transactions, setTransactions] = useState([]);

  const buyMetal = (metal, qty) => {
    const cost = metal.price * qty;

    // Update holdings
    setHoldings((prev) => {
      const prevQty = prev[metal.name]?.qty || 0;
      const prevCost = prev[metal.name]?.totalCost || 0;

      const newQty = prevQty + qty;
      const newTotalCost = prevCost + cost;

      return {
        ...prev,
        [metal.name]: {
          qty: newQty,
          totalCost: newTotalCost,
        },
      };
    });

    // Add transaction
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "Buy",
        metal: metal.name,
        qty,
        value: cost,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const sellMetal = (metal, qty) => {
    const value = metal.price * qty;

    setHoldings((prev) => {
      const prevQty = prev[metal.name]?.qty || 0;
      const prevCost = prev[metal.name]?.totalCost || 0;

      const newQty = Math.max(prevQty - qty, 0);
      const newTotalCost = prevCost * (newQty / (prevQty || 1)); // proportional cost left

      return {
        ...prev,
        [metal.name]: {
          qty: newQty,
          totalCost: newTotalCost,
        },
      };
    });

    // Add transaction
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "Sell",
        metal: metal.name,
        qty,
        value,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  return (
    <PortfolioContext.Provider
      value={{ holdings, transactions, buyMetal, sellMetal }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
