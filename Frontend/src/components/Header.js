import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="navigation">
        <button className="nav-button">Settings</button>
        <button className="nav-button">Log Out</button>
      </div>
    </div>
  );
}

export default Header;
