// TransactionsDropdown.js
import React, { useState, useEffect } from 'react';
import '../styles/TransactionsDropdown.css'; // Ensure this points to the correct file path

function TransactionsDropdown({ accountId }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`http://localhost:8000/api/transaction/${accountId}`, {
      method: 'GET',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(data => {
        setTransactions(data.transactionSummary);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions.');
        setIsLoading(false);
      });
  }, [accountId]);

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transactions-dropdown">
      {/* Static Header Row */}
      <div className="transaction-item transaction-item-header">
        <div className="transaction-detail-label">Transaction ID</div>
        <div className="transaction-detail-label">Date</div>
        <div className="transaction-detail-label">Type</div>
        <div className="transaction-detail-label">Mode</div>
        <div className="transaction-detail-label">Amount</div>
        <div className="transaction-detail-label">Category</div>
      </div>
      {/* Transaction Rows */}
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-item">
          <div className="transaction-detail-value">{transaction.TransactionID}</div>
          <div className="transaction-detail-value">{new Date(transaction.Date).toLocaleString()}</div>
          <div className="transaction-detail-value">{transaction.TransactionType}</div>
          <div className="transaction-detail-value">{transaction.TransactionMode}</div>
          <div className="transaction-detail-value">${transaction.Amount}</div>
          <div className="transaction-detail-value">{transaction.TransactionCategory}</div>
        </div>
      ))}
    </div>
  );
}

export default TransactionsDropdown;
