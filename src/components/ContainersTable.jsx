import React from 'react';
import './ContainersTable.css';

export default function ContainersTable({ containers, onEdit, onDelete }) {
  return (
    <div className="containers-table">
      <table>
        <thead>
          <tr>
            <th>Container Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {containers.length === 0 ? (
            <tr><td colSpan="4">No containers found.</td></tr>
          ) : (
            containers.map((c) => (
              <tr key={c._id}>
                <td>{c.number}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
                <td>{c.status}</td>
                <td>
                  <button className="view-btn">View Orders</button>
                  <button className="edit-btn" onClick={() => onEdit(c)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
