// TransactionsDropdown.js
import React, { useState, useEffect } from 'react';
import '../styles/TransactionsDropdown.css';// Make sure this path matches where your CSS file is located

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
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-item">
          <div>Transaction ID: {transaction.TransactionID}</div>
          <div>Date: {new Date(transaction.Date).toLocaleString()}</div>
          <div>Type: {transaction.TransactionType}</div>
          <div>Mode: {transaction.TransactionMode}</div>
          <div>Amount: ${transaction.Amount}</div>
          <div>Category: {transaction.TransactionCategory}</div>
        </div>
      ))}
    </div>
  );
}

export default TransactionsDropdown;
