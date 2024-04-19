import React from 'react';
import '../styles/BalanceDisplay.css';

// Add a prop for the balance
function BalanceDisplay({ balance }) {
  // Format the balance as a USD currency string
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
