import React from 'react';
import './ProductTable.css';

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Manufacturer</th>
            <th>Availability</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4">No products found.</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.manufacturer}</td>
                <td>{product.availability}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
