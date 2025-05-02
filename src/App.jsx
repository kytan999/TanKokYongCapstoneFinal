import React from 'react';
import './App.css';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import { StockProvider } from './context/StockContext';

function App() {
  return (
    <StockProvider>
      <div className="app-container">
        <div className="dashboard-header">
          <div className="dashboard-branding">
            <img src="/images/logo.png" alt="logo" className="dashboard-icon" />
            <h1 className="dashboard-title">Finance Dashboard</h1>
          </div>

          <StockForm />
          <h2 className="stock-heading">Stock List</h2>
          <StockList />
        </div>
      </div>
    </StockProvider>
  );
}

export default App;
