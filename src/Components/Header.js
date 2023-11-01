import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search for recipes" className="search" />
        </div>
      </div>
      <div className="header-right">
        <button className="header-button recipe">Recipes</button>
        <button className="header-button register">Register</button>
        <button className="header-button login">Login</button>
      </div>
    </header>
  );
}

export default Header;


