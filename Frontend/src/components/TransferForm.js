import React, { useState, useEffect } from 'react';
import '../styles/TransferForm.css';

function TransferForm({ accountId, refreshBalance }) {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionMode, setTransactionMode] = useState('');
  const [notification, setNotification] = useState('');
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionModes, setTransactionModes] = useState([]);

  useEffect(() => {
    // Fetch transaction types
    const fetchTransactionTypes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/transactionTypes", {
          method: "GET",
          headers: {
            "Cookie": "connect.sid=s%3Ap4rmRdOMWVPRv5qVxNHpn0EYWa-_PAsG.k%2BMyo%2Fr3as3hlCYQH%2FNK3LTv4VhbzIPMomr9SnRS%2B2E"
          },
          redirect: "follow"
        });
        const data = await response.json();
        setTransactionTypes(data.transactionTypes);
      } catch (error) {
        console.error('Error fetching transaction types:', error);
      }
    };

    // Fetch transaction modes
    const fetchTransactionModes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/transactionModes", {
          method: "GET",
          headers: {
            "Cookie": "connect.sid=s%3Ap4rmRdOMWVPRv5qVxNHpn0EYWa-_PAsG.k%2BMyo%2Fr3as3hlCYQH%2FNK3LTv4VhbzIPMomr9SnRS%2B2E"
          },
          redirect: "follow"
        });
        const data = await response.json();
        setTransactionModes(data.transactionModes);
      } catch (error) {
        console.error('Error fetching transaction modes:', error);
      }
    };

    fetchTransactionTypes();
    fetchTransactionModes();
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("SenderAccountID", accountId);
    urlencoded.append("ReceiverAccountID", receiverId);
    urlencoded.append("TransferAmount", amount);
    urlencoded.append("TransactionTypeID", transactionType);
    urlencoded.append("TransactionModeID", transactionMode);

    try {
      const response = await fetch("http://localhost:8000/api/transaction/transfer", {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      });
      const result = await response.json();

      if (result.message === "Transaction completed successfully") {
        setNotification("Transaction Successful");
        refreshBalance(); // Refresh balance after successful transaction
      } else {
        setNotification("Transaction Failed");
      }
      setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
    } catch (error) {
      console.error('Error:', error);
      setNotification("Transaction Failed");
      setTimeout(() => setNotification(''), 3000);
    }

    // Reset the form fields
    setReceiverId('');
    setAmount('');
    setTransactionType('');
    setTransactionMode('');
  };

  return (
    <>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Receiver Account ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Transfer Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="" disabled>Select Transaction Type</option>
          {transactionTypes.map((type) => (
            <option key={type.TransactionTypeID} value={type.TransactionTypeID}>{type.Type}</option>
          ))}
        </select>
        <select
          value={transactionMode}
          onChange={(e) => setTransactionMode(e.target.value)}
        >
          <option value="" disabled>Select Transaction Mode</option>
          {transactionModes.map((mode) => (
            <option key={mode.ModeID} value={mode.ModeID}>{mode.ModeType}</option>
          ))}
        </select>
        <button type="submit">Submit Transfer</button>
      </form>
      {notification && <div className={`notification ${notification === 'Transaction Failed' ? 'failure' : ''}`}>{notification}</div>}
    </>
  );
}

export default TransferForm;