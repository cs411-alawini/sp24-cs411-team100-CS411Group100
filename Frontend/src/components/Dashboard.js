import React from 'react';
import Header from './Header.js';
import BalanceDisplay from './BalanceDisplay.js';
import ButtonPanel from './ButtonPanel.js';
import '../styles/Dashboard.css'; // If you have separate CSS for the dashboard

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <BalanceDisplay />
      <ButtonPanel />
    </div>
  );
}

export default Dashboard;
