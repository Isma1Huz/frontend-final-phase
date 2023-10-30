import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="top-left">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search for recipes" />
        </div>
      </div>
      <div className="top-right">
        <button className="recipe">Recipes</button>
        <button className="register">Register</button>
        <button className="login">Login</button>
      </div>
    </header>
  );
}

export default Header;


