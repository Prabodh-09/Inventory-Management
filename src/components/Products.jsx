import React, { useState, useEffect } from 'react';
import './Products.css';
import Sidebar from './Sidebar';

import ProductCard from './ProductCard';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import axios from 'axios';


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filtered products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // Handle add
  const handleAdd = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  // On save (add/edit)
  const handleSave = (product) => {
    if (editProduct) {
      // Edit mode
      setProducts(prev =>
        prev.map(p => (p._id === product._id ? product : p))
      );
    } else {
      // Add mode
      setProducts(prev => [...prev, product]);
    }
    setShowModal(false);
  };

  return (
    <div className="products-page">
      <Sidebar />
      <div className="products-main">
        <h1>Products</h1>

        <div className="products-content">
          <div className="products-cards">
            <ProductCard title="Total Products" value={products.length} subtitle="Last 7 days" />
            <ProductCard title="Top Selling" value="5" subtitle="$1500" />
            <ProductCard title="Low Stocks" value="12 Ordered" subtitle="2 Not in Stock" />
          </div>

          <div className="products-header">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="products-search"
            />
            <button className="add-product-btn" onClick={handleAdd}>+ Add Product</button>
          </div>

          <ProductTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <ProductModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          product={editProduct}
        />
      )}
    </div>
  );
}
