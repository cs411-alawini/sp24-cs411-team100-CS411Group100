import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import BalanceDisplay from './BalanceDisplay.js';
import ButtonPanel from './ButtonPanel.js';
import '../styles/Dashboard.css';

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [showTransactions, setShowTransactions] = useState(false);
  const location = useLocation();
  const { state } = location; // Get the state object from location
  const accountId = state ? state.accountId : null; // Extract accountId from state

  useEffect(() => {
    if (accountId) {
      const myHeaders = new Headers();
      const token = localStorage.getItem('token');
      myHeaders.append("Authorization", `Bearer ${token}`);

      fetch(`http://localhost:8000/api/account`, {
        method: 'GET',
        headers: myHeaders,
      })
        .then(response => response.json())
        .then(result => {
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

  const toggleTransactions = () => setShowTransactions(!showTransactions);


  const refreshBalance = () => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    fetch("http://localhost:8000/api/account", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    })
    .then(response => response.json())
    .then(result => {
      // Assuming the response contains an array of account objects
      const accountData = result.accounts.find(acc => acc.AccountID === accountId);
      if (accountData) {
        setAccount(accountData);
      } else {
        throw new Error('Account not found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to refresh balance. Please try again later.');
    });
  };
  

  return (
    <div className="dashboard">
      <Header />
      {account && <BalanceDisplay balance={account.Balance} />}
      <ButtonPanel 
        toggleTransactions={toggleTransactions} 
        showTransactions={showTransactions}
        accountId={accountId}
        refreshBalance={refreshBalance}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Dashboard;
