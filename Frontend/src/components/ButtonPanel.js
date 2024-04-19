import React from 'react';
import ActionButton from './ActionButton';
import '../styles/ButtonPanel.css';

function ButtonPanel() {
  return (
    <div className="button-panel">
      <ActionButton label="Transfer" color="brown" />
      <ActionButton label="Show Transactions" color="brown" />
      <ActionButton label="Analyze" color="green" />
    </div>
  );
}

export default ButtonPanel;
