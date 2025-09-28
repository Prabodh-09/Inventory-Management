import React from 'react';
import './ProductCard.css';

export default function ProductCard({ title, value, subtitle }) {
  return (
    <div className="product-card">
      <h4>{title}</h4>
      <p className="product-card-value">{value}</p>
      <p className="product-card-sub">{subtitle}</p>
    </div>
  );
}
