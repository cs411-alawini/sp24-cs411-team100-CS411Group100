// LoansPage.js
import React from 'react';
import '../styles/LoansPage.css';

function LoansPage({ onGetNewLoan, onViewLoans, onBack }) {
  return (
    <div className="loans-container">
      <h1 className="loans-title">Manage Your Loans</h1>
      <div className="loans-button-row">
        <div className="loan-option" onClick={onGetNewLoan}>
          Get New Loan
        </div>
        <div className="loan-option" onClick={onViewLoans}>
          View Loans
        </div>
        <div className="loan-option loan-option back-to-dashboard" onClick={onBack}>
          Back to Dashboard
        </div>
      </div>
    </div>
  );
}

export default LoansPage;
