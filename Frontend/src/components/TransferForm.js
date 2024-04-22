import React, { useState } from 'react';
import '../styles/TransferForm.css';

function TransferForm({ accountId, refreshBalance }) {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionMode, setTransactionMode] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
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

    fetch("http://localhost:8000/api/transaction/transfer", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    })
    .then(response => response.json())
    .then(result => {
      if (result.message === "Transaction completed successfully") {
        setNotification("Transaction Successful");
        refreshBalance(); // Refresh balance after successful transaction
      } else {
        setNotification("Transaction Failed");
      }
      setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
    })
    .catch(error => {
      console.error('Error:', error);
      setNotification("Transaction Failed");
      setTimeout(() => setNotification(''), 3000);
    });

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
          <option value="" disabled selected hidden>Transaction Type</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          <option value="3">Type 3</option>
        </select>
        <select
          value={transactionMode}
          onChange={(e) => setTransactionMode(e.target.value)}
        >
          <option value="" disabled selected hidden>Transaction Mode</option>
          <option value="1">Mode 1</option>
          <option value="2">Mode 2</option>
          <option value="3">Mode 3</option>
        </select>
        <button type="submit">Submit Transfer</button>
      </form>
      {notification && <div className={`notification ${notification === 'Transaction Failed' ? 'failure' : ''}`}>{notification}</div>}
    </>
  );
}

export default TransferForm;
