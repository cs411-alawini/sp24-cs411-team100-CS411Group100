import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error message

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("/api/auth/token", requestOptions)
      .then(response => response.json())
      .then(result => {
      if (result.token) {
        console.log('Login successful:', result);
        localStorage.setItem('token', result.token); // Save the token to local storage
        navigate("/accounts"); // Navigate to accounts page on successful login
      } else {
        setError('Incorrect username or password'); // Set error message on failure
      }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Login failed. Please try again later.'); // Set error message on fetch failure
      });
  };

  return (
    <div className="login-form">
      <div className="logo">DollarIQ</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        New? <span onClick={() => navigate('/signup')}>Create Account</span>
      </div>
    </div>
  );
}

export default LoginForm;
