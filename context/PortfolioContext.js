import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const buyMetal = (metal, qtyRaw) => {
    const qty = Number(qtyRaw) || 0;
    const price = Number(metal.price) || 0;
    if (qty <= 0 || price <= 0) return;

    const cost = price * qty;

    setHoldings((prev) => {
      const existing = prev.find((h) => h.name === metal.name);
      if (existing) {
        const updated = {
          ...existing,
          qty: existing.qty + qty,
          totalCost: existing.totalCost + cost,
          currentPrice: price,
        };
        return prev.map((h) => (h.name === metal.name ? updated : h));
      }
      return [
        ...prev,
        { name: metal.name, qty, totalCost: cost, currentPrice: price },
      ];
    });

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

  const sellMetal = (metal, qtyRaw) => {
    const qty = Number(qtyRaw) || 0;
    const price = Number(metal.price) || 0;
    if (qty <= 0 || price <= 0) return;

    setHoldings((prev) => {
      const existing = prev.find((h) => h.name === metal.name);
      if (!existing || existing.qty <= 0) return prev;

      const sellQty = Math.min(qty, existing.qty);
      const newQty = existing.qty - sellQty;
      const newTotalCost =
        existing.qty === 0 ? 0 : existing.totalCost * (newQty / existing.qty);

      const updated = {
        ...existing,
        qty: newQty,
        totalCost: newTotalCost,
        currentPrice: price,
      };

      return prev.map((h) => (h.name === metal.name ? updated : h));
    });

    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "Sell",
        metal: metal.name,
        qty,
        value: price * qty,
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
