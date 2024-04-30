import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Accounts.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Instantiate the navigate function

  useEffect(() => {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
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
        setAccounts(result.accounts); // Set it to the accounts state
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to load accounts. Please try again later.');
      });
  }, []);

  // Handler for clicking an account
  const handleAccountClick = (accountId) => {
    localStorage.setItem('accountId', accountId);
    navigate('/dashboard', { state: { accountId } });
  };

  return (
    <div className="accounts-page">
      <h1>Welcome. Choose your account.</h1>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <div
            key={account.AccountID}
            className="account-option"
            onClick={() => handleAccountClick(account.AccountID)} // Add the onClick event here
          >
            {account.AccountID}
            {/* Display other account details if needed */}
          </div>
        ))
      ) : (
        <p>No accounts available.</p>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Accounts;
