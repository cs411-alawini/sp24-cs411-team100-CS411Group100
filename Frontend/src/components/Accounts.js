import React, { useState, useEffect } from 'react';
import Header from './HeaderUser.js';
import { useNavigate } from 'react-router-dom';
import '../styles/Accounts.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/account", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setAccounts(result.accounts);
      })
      .catch(error => {
        console.error('Error:', error);
        // setError('Failed to load accounts. Please try again later.');
      });
  }, []);

  const handleAccountClick = (accountId) => {
    localStorage.setItem('accountId', accountId);
    navigate('/dashboard', { state: { accountId } });
  };

  return (
    <div className="accounts-page">
      <Header />
      <div className="center-container"> {/* Add this wrapper for centering */}
        <h1>Welcome. Choose your account.</h1>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div
              key={account.AccountID}
              className="account-option"
              onClick={() => handleAccountClick(account.AccountID)}
            >
              {account.AccountID}
            </div>
          ))
        ) : (
          <p>No accounts available.</p>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Accounts;