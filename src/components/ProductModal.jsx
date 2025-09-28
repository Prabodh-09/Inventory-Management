import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import axios from 'axios';

export default function ProductModal({ onClose, onSave, product }) {
  const [form, setForm] = useState({
    name: '',
    manufacturer: '',
    availability: ''
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (product) {
        res = await axios.put(`/api/products/${product._id}`, form);
      } else {
        res = await axios.post('/api/products', form);
      }
      onSave(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-modal-backdrop">
      <div className="product-modal">
        <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="manufacturer"
            placeholder="Manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            required
          />
          <input
            name="availability"
            placeholder="Availability"
            value={form.availability}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
