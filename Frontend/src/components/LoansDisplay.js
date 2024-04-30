import React, { useEffect, useState } from 'react';
import '../styles/LoansDisplay.css';  // Ensure this path correctly points to the new CSS file
import LoanRepaymentSchedule from './LoanRepaymentSchedule';

function LoansDisplay() {
  const [loans, setLoans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  useEffect(() => {
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const myHeaders = new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/loan/${accountId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoans(result.loans);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching loans:', error);
        setLoading(false);
      });
  }, []);

  const toggleLoanDetails = (loanId) => {
    if (selectedLoanId === loanId) {
      setSelectedLoanId(null);
    } else {
      setSelectedLoanId(loanId);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!loans || loans.length === 0) return <div>No Loans Taken</div>;

  return (
    <div>
      <div className="loans-display">
        {loans.map(loan => (
          <button key={loan.LoanID} className="loan-item" onClick={() => toggleLoanDetails(loan.LoanID)}>
            Loan ID: {loan.LoanID}
          </button>
        ))}
      </div>
      {selectedLoanId && <LoanRepaymentSchedule loanId={selectedLoanId} />}
    </div>
  );
}

export default LoansDisplay;