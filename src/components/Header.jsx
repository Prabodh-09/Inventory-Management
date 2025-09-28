import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="header-left"><h1>Dashboard</h1></div>
      <div className="header-right">
        <button className="notif-button">🔔</button>
        <img src="/avatar.png" alt="User Avatar" className="avatar" />
      </div>
    </div>
  );
}
