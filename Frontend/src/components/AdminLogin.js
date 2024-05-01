import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'; // Make sure to style this similarly to your LoginForm

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("/api/auth/employeeToken", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          console.log('Admin Login successful:', result);
          localStorage.setItem('token', result.token); // Save the token to local storage
          navigate("/insights"); // Navigate to admin dashboard on successful login
        } else {
          setError('Incorrect username or password'); // Set error message on login failure
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Admin Login failed. Please try again later.'); // Set error message on fetch failure
      });
  };

  return (
    <div className="admin-login-form">
      <div className="logo">DollarIQ Admin</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Admin Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Admin Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AdminLogin;
