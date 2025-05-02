import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import './StockList.css';

function StockList() {
    const { stocks, loading } = useContext(StockContext);

    if (stocks.length === 0) {
        return <p>No stocks available.</p>;
    }

    return (
        <div className="stock-list-container">
            {loading && <p>Updating stock prices...</p>}

            {stocks.map((stock, index) => {
                const hasValidPrice = stock.currentPrice > 0;
                const profitLoss = hasValidPrice
                    ? (stock.currentPrice - stock.purchasePrice) * stock.quantity
                    : null;

                return (
                    <div key={`${stock.symbol}-${index}`} className="stock-card">
                        <strong className="stock-symbol">{stock.symbol.toUpperCase()}</strong><br />
                        Quantity: {stock.quantity}<br />
                        Purchase Price: ${stock.purchasePrice.toFixed(2)}<br />
                        {hasValidPrice ? (
                            <>
                                Current Price: ${stock.currentPrice.toFixed(2)}<br />
                                <strong className={profitLoss >= 0 ? 'profit' : 'loss'}>
                                    Profit/Loss: ${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </strong>
                            </>
                        ) : (
                            <p style={{ color: 'blue', fontWeight: 'bold' }}>Oops! Stock or Price Info Isn't Available Right Now.</p>
                        )}
                    </div>
                );
            })}

            <div className="legend">
                <span><span className="color-box green"></span> Profit</span>
                <span style={{ marginLeft: '15px' }}><span className="color-box red"></span> Loss</span>
            </div>
        </div>
    );
}

export default StockList;
