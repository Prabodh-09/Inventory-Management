import React, { useState, useEffect } from 'react';
import './SaleModal.css';
import axios from 'axios';

export default function SaleModal({ sale, onClose, onSave }) {
  const [formData, setFormData] = useState({
    saleId: '',
    product: '',
    customer: '',
    date: '',
    bundlesSold: '',
    bundlesLeft: '',
    status: 'Shipped',
  });

  useEffect(() => {
    if (sale) {
      setFormData({
        saleId: sale.saleId || '',
        product: sale.product || '',
        customer: sale.customer || '',
        date: sale.date ? sale.date.substring(0, 10) : '',
        bundlesSold: sale.bundlesSold || '',
        bundlesLeft: sale.bundlesLeft || '',
        status: sale.status || 'Shipped',
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (sale) {
        response = await axios.put(`/api/sales/${sale._id}`, formData);
      } else {
        response = await axios.post('/api/sales', formData);
      }

      onSave(response.data);
    } catch (err) {
      console.error('Error saving sale:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{sale ? 'Edit Sale' : 'Add Sale'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Sale ID:</label>
          <input type="text" name="saleId" value={formData.saleId} onChange={handleChange} required />

          <label>Product:</label>
          <input type="text" name="product" value={formData.product} onChange={handleChange} required />

          <label>Customer:</label>
          <input type="text" name="customer" value={formData.customer} onChange={handleChange} required />

          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Bundles Sold:</label>
          <input type="number" name="bundlesSold" value={formData.bundlesSold} onChange={handleChange} required />

          <label>Bundles Left:</label>
          <input type="number" name="bundlesLeft" value={formData.bundlesLeft} onChange={handleChange} required />

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
