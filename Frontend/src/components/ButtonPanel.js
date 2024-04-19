// ButtonPanel.js
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import TransactionsDropdown from './TransactionsDropdown';
import '../styles/ButtonPanel.css';

function ButtonPanel({ accountId }) {
  const [showTransactions, setShowTransactions] = useState(false);

  const toggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  return (
    <div className="button-panel">
      <ActionButton label="Transfer" color="brown" />
      <ActionButton 
        label="Show Transactions" 
        color="brown" 
        onClick={toggleTransactions} 
      />
      <ActionButton label="Analyze" color="green" />
      {showTransactions && <TransactionsDropdown accountId={accountId} />}
    </div>
  );
}

export default ButtonPanel;
