import React, { useState, useEffect } from 'react';
import './ContainerModal.css';

export default function ContainerModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    containerNumber: '',
    productName: '',
    color: '',
    size: '',
    pieces: '',
    bundles: '',
    date: '',
    status: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        containerNumber: '',
        productName: '',
        color: '',
        size: '',
        pieces: '',
        bundles: '',
        date: '',
        status: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>{initialData ? 'Edit Container' : 'Add Container'}</h2>
        <form onSubmit={handleSubmit} className="container-form">
          <label>
            Container Number:
            <input type="text" name="containerNumber" value={formData.containerNumber} onChange={handleChange} required />
          </label>

          <label>
            Product Name:
            <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
          </label>

          <label>
            Color:
            <input type="text" name="color" value={formData.color} onChange={handleChange} required />
          </label>

          <label>
            Size:
            <input type="text" name="size" value={formData.size} onChange={handleChange} required />
          </label>

          <label>
            Pieces:
            <input type="number" name="pieces" value={formData.pieces} onChange={handleChange} required />
          </label>

          <label>
            Bundles:
            <input type="number" name="bundles" value={formData.bundles} onChange={handleChange} required />
          </label>

          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>

          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
