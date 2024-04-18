import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginChoice from './components/LoginChoice.js';
import LoginForm from './components/LoginForm.js';
import Dashboard from './components/Dashboard.js';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* 'Switch' is replaced by 'Routes' */}
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginChoice />} />
          <Route path="/login/:userType" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;