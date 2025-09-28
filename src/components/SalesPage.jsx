import React, { useState, useEffect } from 'react';
import './SalesPage.css';
import Sidebar from './Sidebar';

import SalesTable from './SalesTable';
import SaleModal from './SaleModal';
import axios from 'axios';

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editSale, setEditSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get('/api/sales');
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setEditSale(null);
    setShowModal(true);
  };

  const handleEdit = (sale) => {
    setEditSale(sale);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sales/${id}`);
      setSales(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = (sale) => {
    if (editSale) {
      setSales(prev => prev.map(s => (s._id === sale._id ? sale : s)));
    } else {
      setSales(prev => [...prev, sale]);
    }
    setShowModal(false);
  };

  const filteredSales = sales.filter(s =>
    s.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sales-page">
      <Sidebar />
      <div className="sales-main">
        <h1>Sales</h1>
        <div className="sales-content">
          <div className="sales-header">
            <h2>Sales</h2>
            <input
              type="text"
              placeholder="Search by product or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sales-search"
            />
            <button className="add-sale-btn" onClick={handleAdd}>+ Add Sale</button>
          </div>
          <SalesTable
            sales={filteredSales}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showModal && (
        <SaleModal
          sale={editSale}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
