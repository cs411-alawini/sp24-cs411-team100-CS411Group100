// ButtonPanel.js
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import TransactionsDropdown from './TransactionsDropdown';
import TransferForm from './TransferForm';
import '../styles/ButtonPanel.css';

function ButtonPanel({ toggleTransactions, showTransactions, accountId, refreshBalance}) {
  const [showTransferForm, setShowTransferForm] = useState(false);

  return (
    <div className="button-panel">
      <div className="button-row">
        <ActionButton label="Transfer" color="brown" onClick={() => setShowTransferForm(!showTransferForm)} />
        <ActionButton label="Show Transactions" color="brown" onClick={toggleTransactions} />
        <ActionButton label="Analyze" color="green" />
      </div>
      {showTransferForm && (
        <TransferForm
          accountId={accountId}
          refreshBalance={refreshBalance}
        />
      )}
      {showTransactions && <TransactionsDropdown accountId={accountId} />}
    </div>
  );
}

export default ButtonPanel;