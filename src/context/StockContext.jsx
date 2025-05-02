import React, { createContext, useState, useEffect, useCallback } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);
    const [pendingStocks, setPendingStocks] = useState([]);  // Track new stocks
    const [loading, setLoading] = useState(false);

    const API_KEY = 'YNN65NW8ZHCU0YRR1';

    const fetchPrices = useCallback(async () => {
        if (pendingStocks.length === 0) return;

        setLoading(true);
        const updated = await Promise.all(
            pendingStocks.map(async (stock) => {
                const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const price = data['Global Quote'] && data['Global Quote']['05. price']
                        ? parseFloat(data['Global Quote']['05. price'])
                        : 0;

                    return { ...stock, currentPrice: price };
                } catch (err) {
                    console.error(`Error fetching ${stock.symbol}`, err);
                    return { ...stock, currentPrice: 0 };
                }
            })
        );

        setStocks(prev => [...prev, ...updated]);  // Add updated stocks to main list
        setPendingStocks([]);  // Clear pending list
        setLoading(false);
    }, [pendingStocks, API_KEY]);

    // UseEffect runs when pendingStocks is updated
    useEffect(() => {
        fetchPrices();
    }, [pendingStocks, fetchPrices]);

    const addStock = (stock) => {
        setPendingStocks([stock]);   // Trigger useEffect to fetch this stock's price
    };

    return (
        <StockContext.Provider value={{ stocks, addStock, loading }}>
            {children}
        </StockContext.Provider>
    );
};
