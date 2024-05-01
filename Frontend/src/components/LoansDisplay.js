import React, { useEffect, useState } from 'react';
import '../styles/LoansDisplay.css';
import LoanRepaymentSchedule from './LoanRepaymentSchedule';

function LoansDisplay() {
  const [loans, setLoans] = useState(null);
  const [loanTypes, setLoanTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  useEffect(() => {
    const fetchLoanTypes = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", "connect.sid=s%3A_LenbAQ97_JLfAQzwkQIWdd7RLr1MQO1.A3McyfKl2FYbAwvcrbuma8kV9mFQD5ZZtLkOm2Ac5ZU");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch("/api/get/loanTypes", requestOptions);
        const result = await response.json();
        const types = result.loanTypes.reduce((acc, type) => {
          acc[type.LoanTypeID] = type.Type;
          return acc;
        }, {});
        setLoanTypes(types);
      } catch (error) {
        console.error('Error fetching loan types:', error);
      }
    };

    const fetchLoans = async () => {
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

      try {
        const response = await fetch(`/api/loan/${accountId}`, requestOptions);
        const result = await response.json();
        setLoans(result.loans);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loans:', error);
        setLoading(false);
      }
    };

    fetchLoanTypes();
    fetchLoans();
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
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div className="loans-display" style={{ width: '50%', margin: '0 auto' }}>
        {loans.map(loan => (
          <button key={loan.LoanID} className="loan-item" onClick={() => toggleLoanDetails(loan.LoanID)}>
            <div className="loan-item-id">Loan ID: {loan.LoanID}</div>
            <div className="loan-item-detail">Date Taken: {new Date(loan.Date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</div>
            <div className="loan-item-detail">Duration: {loan.DurationInMonths} months</div>
            <div className="loan-item-detail">Type: {loanTypes[loan.LoanTypeID]}</div>
          </button>
        ))}
      </div>
      {selectedLoanId && <LoanRepaymentSchedule loanId={selectedLoanId} />}
    </div>
  );
}

export default LoansDisplay;