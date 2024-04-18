import React from 'react';
import '../styles/ActionButton.css';

function ActionButton({ label, color, onClick }) {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button className="action-button" style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
}

export default ActionButton;
