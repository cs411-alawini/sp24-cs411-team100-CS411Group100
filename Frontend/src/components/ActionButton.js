// ActionButton.js
import React from 'react';

const ActionButton = ({ label, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default ActionButton;