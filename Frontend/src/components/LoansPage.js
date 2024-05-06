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
      <div className="loans-button-row" style={{ width: '50%', margin: '0 auto' }}>
        {/* <div className="loan-option" style={{margin: '10px 0 10px 15%'}} onClick={() => { onGetNewLoan(); handleHideLoans(); }}>
          Get New Loan
        </div> */}
        <div className="loan-option"  style={{margin: '10px 0 10px 20%'}}  onClick={handleShowLoans}>
          View Loans
        </div>
        <div className="loan-option loan-option back-to-dashboard" style={{margin: '10px 20% 10px 0'}} onClick={() => { onBack(); handleHideLoans(); }}>
          Back to Dashboard
        </div>
      </div>
      {showLoans && <LoansDisplay />}
    </div>
  );
}

export default LoansPage;