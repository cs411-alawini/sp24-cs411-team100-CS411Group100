import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import BalanceDisplay from './BalanceDisplay.js';
import ButtonPanel from './ButtonPanel.js';
import '../styles/Dashboard.css';
import LoansPage from './LoansPage';

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [showTransactions, setShowTransactions] = useState(false);
  const location = useLocation();
  const [showLoans, setShowLoans] = useState(false);
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

  const toggleLoans = () => setShowLoans(!showLoans);

  // Handlers for the LoansPage actions
  const handleGetNewLoan = () => {
    console.log('Navigate to get new loan form or handle inline');
  };

  const handleViewLoans = () => {
    console.log('Show existing loans or navigate to loans overview');
  };

  const handleBack = () => {
    setShowLoans(false); // Simply set showLoans to false to return to dashboard
  };


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
      {!showLoans && (
        <>
          {account && <BalanceDisplay balance={account.Balance} />}
          <ButtonPanel 
            toggleTransactions={toggleTransactions} 
            showTransactions={showTransactions}
            toggleLoans={toggleLoans} // Pass toggleLoans function
            accountId={accountId}
            refreshBalance={refreshBalance}
          />
        </>
      )}
      {showLoans && (
        <LoansPage 
          onGetNewLoan={handleGetNewLoan}
          onViewLoans={handleViewLoans}
          onBack={handleBack} // Pass the handler for going back to the dashboard
        />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Dashboard;
