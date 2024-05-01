import React, { useState, useEffect } from 'react';
import '../styles/TransactionsDropdown.css';

function TransactionsDropdown({ accountId }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20000;  // Constant, because it's not meant to be changed dynamically in this component
  const handleNext = () => {
    if (page < totalPages) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        console.log("Next page:", nextPage);  // Debug log
        return nextPage;
      });
    }
  };
  
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prevPage => {
        const prev = prevPage - 1;
        console.log("Previous page:", prev);  // Debug log
        return prev;
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const queryParams = new URLSearchParams({
      page: page,
      limit: itemsPerPage
    });

    fetch(`http://localhost:8000/api/transaction/${accountId}?${queryParams}`, {
      method: 'GET',
      headers: myHeaders
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.transactionSummary) {
        setTransactions(data.transactionSummary);
        setTotalPages(data.totalPages);
      } else {
        throw new Error('Transaction data is missing in the response');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [accountId, page]);

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transactions-dropdown">
      <div className="transaction-item transaction-item-header">
        <div className="transaction-detail-label">Transaction ID</div>
        <div className="transaction-detail-label">Date</div>
        <div className="transaction-detail-label">Type</div>
        <div className="transaction-detail-label">Mode</div>
        <div className="transaction-detail-label">Amount</div>
        
      </div>
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-item">
          <div className="transaction-detail-value">{transaction.TransactionID}</div>
          <div className="transaction-detail-value">{new Date(transaction.Date).toLocaleString()}</div>
          <div className="transaction-detail-value">{transaction.TransactionType}</div>
          <div className="transaction-detail-value">{transaction.TransactionMode}</div>
          <div className="transaction-detail-value">${transaction.Amount}</div>
          
        </div>
      ))}
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default TransactionsDropdown;
