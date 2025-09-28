import React from 'react';
import './SalesTable.css';

export default function SalesTable({ sales, onEdit, onDelete }) {
  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Bundles Sold</th>
            <th>Bundles Left</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr><td colSpan="8" style={{ textAlign: 'center' }}>No sales found</td></tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.saleId}</td>
                <td>{sale.product}</td>
                <td>{sale.customer}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>{sale.bundlesSold}</td>
                <td>{sale.bundlesLeft}</td>
                <td>
                  <span className={`status-badge ${sale.status.toLowerCase()}`}>
                    {sale.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(sale)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(sale._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
