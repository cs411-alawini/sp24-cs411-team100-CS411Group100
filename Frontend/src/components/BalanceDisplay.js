import React from 'react';
import '../styles/BalanceDisplay.css';

function BalanceDisplay({ balance }) {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  return (
    <div className="balance-display">
      <h2>Balance</h2>
      <div className="balance-amount">
        {formattedBalance}
      </div>
    </div>
  );
}

export default BalanceDisplay;
