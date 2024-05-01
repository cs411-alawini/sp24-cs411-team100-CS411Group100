import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthType, init } from "@thoughtspot/visual-embed-sdk";
import LoginChoice from './components/LoginChoice';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import LoansPage from './components/LoansPage';
import SettingsPageAccount from './components/SettingsPageAccount';
import SettingsPageUser from './components/SettingsPageUser';
import AdminLogin from './components/AdminLogin';
import DistrictInsights from './components/Districtinsights'; // Make sure it's imported correctly
import SignUpForm from './components/SignUpForm';
import { Search } from "./components/Search"; // Import the Search component
import { EmbedLiveboard } from "./components/EmbedLiveboard"; // Import the EmbedLiveboard component
import './styles/App.css';

// Initialize the ThoughtSpot Visual Embed SDK
init({
  thoughtSpotHost: 'https://team2.thoughtspot.cloud/',
  authType: AuthType.None
});

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
          <Route path="/insights" element={<DistrictInsights />} />
          <Route path="/search" element={<Search />} />  // ThoughtSpot Search
          <Route path="/liveboard" element={<EmbedLiveboard />} />  // ThoughtSpot Liveboard
        </Routes>
      </div>
    </Router>
  );
}

export default App;
