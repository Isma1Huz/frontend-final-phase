import React from 'react';
import './Header.css'; // Import your CSS file for the header

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
        <button>Recipes</button>
        <button>Login</button>
        <button>Register</button>
      </div>
    </header>
  );
}

export default Header;

