import React from 'react';
import './SummaryCard.css';

export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-icon">{icon}</div>
      <div className="summary-info">
        <div className="summary-value">{value}</div>
        <div className="summary-title">{title}</div>
      </div>
    </div>
  );
}
