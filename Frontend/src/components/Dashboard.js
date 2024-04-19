import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import BalanceDisplay from './BalanceDisplay.js';
import ButtonPanel from './ButtonPanel.js'; // Make sure to update this component as discussed
import '../styles/Dashboard.css';

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [showTransactions, setShowTransactions] = useState(false); // New state for toggling transactions
  const location = useLocation();
  const { accountId } = location.state || {};

  useEffect(() => {
    if (accountId) {
      const myHeaders = new Headers();
      const token = localStorage.getItem('token');
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`http://localhost:8000/api/account`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // Find the account with the matching AccountID
          const accountData = result.accounts.find(acc => acc.AccountID === accountId);
          if (accountData) {
            setAccount(accountData);
          } else {
            setError('Account not found');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setError('Failed to load account details. Please try again later.');
        });
    }
  }, [accountId]);

  // Toggle the visibility of the transactions dropdown
  const toggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  return (
    <div className="dashboard">
      <Header />
      {account && <BalanceDisplay balance={account.Balance} />} {/* Display balance only if account is not null */}
      {/* Pass toggleTransactions and showTransactions as props */}
      <ButtonPanel 
        toggleTransactions={toggleTransactions} 
        showTransactions={showTransactions}
        accountId={accountId}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Dashboard;
