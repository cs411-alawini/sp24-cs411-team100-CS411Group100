import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from './ActionButton';
import TransactionsDropdown from './TransactionsDropdown';
import TransferForm from './TransferForm';
// import AnalyzeDropdown from './AnalyzeDropdown'; 
import '../styles/ButtonPanel.css';

function ButtonPanel({ toggleTransactions, showTransactions, toggleLoans, accountId, refreshBalance, fontSize }) {
  const [showTransferForm, setShowTransferForm] = useState(false);
  // const [showAnalyze, setShowAnalyze] = useState(false); 
  const navigate = useNavigate();

  // Font size class determination
  const fontSizeClass = fontSize === 'large' ? 'large-font' : '';

  return (
    <div className="button-panel">
      <div className="button-row">
        <ActionButton 
          label="Transfer" 
          className={`action-button transfer-button ${fontSizeClass}`}
          onClick={() => setShowTransferForm(!showTransferForm)}
        />
        <ActionButton 
          label="Show Transactions" 
          className={`action-button transactions-button ${fontSizeClass}`}
          onClick={toggleTransactions}
        />
        <ActionButton 
          label="Loans" 
          className={`action-button loans-button ${fontSizeClass}`}
          onClick={toggleLoans}
        />
        {/* <ActionButton 
          label="Analyze" 
          className={`action-button analyze-button ${fontSizeClass}`}
          onClick={() => setShowAnalyze(!showAnalyze)} 
        /> */}
        <ActionButton 
          label="Back to Accounts" 
          className={`action-button back-to-accounts-button ${fontSizeClass}`}
          onClick={() => navigate('/accounts')}
        />
      </div>
      {showTransferForm && <TransferForm accountId={accountId} refreshBalance={refreshBalance} />}
      {showTransactions && <TransactionsDropdown accountId={accountId} />}
      {/* {showAnalyze && <AnalyzeDropdown accountId={accountId} />}  */}
    </div>
  );
}

export default ButtonPanel;
