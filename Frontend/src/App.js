import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginChoice from './components/LoginChoice';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import LoansPage from './components/LoansPage';
import SettingsPageAccount from './components/SettingsPageAccount';
import SettingsPageUser from './components/SettingsPageUser';
import AdminLogin from './components/AdminLogin'; // Assuming you have this component
import DistrictInsights from './components/Districtinsights'; // Make sure it's imported
import SignUpForm from './components/SignUpForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginChoice />} />
          <Route path="/login/user" element={<LoginForm />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/settingsaccount" element={<SettingsPageAccount />} />
          <Route path="/settingsuser" element={<SettingsPageUser />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/insights" element={<DistrictInsights />} /> {/* New route for District Insights */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
