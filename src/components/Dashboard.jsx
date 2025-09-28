import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import './Dashboard.css';

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalInventory: 0,
    totalProducts: 2,
    totalContainers: 3,
    purchaseAmount: 0,
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error('Error fetching summary:', err));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="summary-grid">
          <SummaryCard title="Total Inventory" value={`${summary.totalInventory} items in stock`} icon="📦" />
          <SummaryCard title="Total Products" value={`${summary.totalProducts} unique products`} icon="🛍️" />
          <SummaryCard title="Total Containers" value={`${summary.totalContainers} containers`} icon="🧺" />
          <SummaryCard title="Purchase Amount" value={`$${summary.purchaseAmount}`} icon="💰" />
        </div>
        <div className="charts-section">
          <Chart title="Inventory by Product" />
          <Chart title="Inventory by Color" />
        </div>
      </div>
    </div>
  );
}
