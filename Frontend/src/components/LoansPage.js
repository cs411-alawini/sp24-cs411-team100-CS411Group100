import React, { useState } from 'react';
import '../styles/LoansPage.css';
import LoansDisplay from './LoansDisplay';

function LoansPage({ onGetNewLoan, onViewLoans, onBack }) {
  const [showLoans, setShowLoans] = useState(false);

  const handleShowLoans = () => {
    setShowLoans(!showLoans);  // Toggle visibility
    if (!showLoans) {
      onViewLoans();  // Optionally, handle additional logic when viewing loans
    }
  };

  const handleHideLoans = () => {
    setShowLoans(false);
  };

  return (
    <div className="loans-container">
      <h1 className="loans-title">Manage Your Loans</h1>
      <div className="loans-button-row">
        <div className="loan-option" onClick={() => { onGetNewLoan(); handleHideLoans(); }}>
          Get New Loan
        </div>
        <div className="loan-option" onClick={handleShowLoans}>
          View Loans
        </div>
        <div className="loan-option loan-option back-to-dashboard" onClick={() => { onBack(); handleHideLoans(); }}>
          Back to Dashboard
        </div>
      </div>
      {showLoans && <LoansDisplay />}
    </div>
  );
}

export default LoansPage;