import React from 'react';
import './Chart.css';

export default function Chart({ title, children }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-placeholder">
        {children || <div className="placeholder-box">[ Chart Placeholder ]</div>}
      </div>
    </div>
  );
}
