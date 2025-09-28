import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


const links = [
  { name: 'Dashboard', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Containers', path: '/containers' },
  { name: 'Sales', path: '/sales' },
  { name: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-brand">InventoryApp</h2>
      <nav>
        {links.map(link => (
        <Link key={link.name} to={link.path} className="sidebar-link">
            {link.name}
        </Link>
        ))}

      </nav>
    </div>
  );
}
