import React from 'react';
import './Footer.css'; // Import your CSS file for the footer

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-column">
        <div className="company-logo">
          <img src="/logo.png" alt="Company Logo" />
        </div>
        <p className="rights-text">All rights reserved</p>
        <div className="social-icons">
          <a href="www.facebook.com" className="social-icon">
            <img src="/fb_Logo.png" alt="Facebook" />
          </a>
          <a href="www.twitter.com" className="social-icon">
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a href="www.snapchat.com" className="social-icon">
            <img src="/snapchat.png" alt="YouTube" />
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h3>Fresh Recipes</h3>
        <ul className="recipe-list">
          <li>Winter Salads</li>
          <li>Organic Chicken</li>
          <li>Beef and Mutton</li>
          <li>Flavored Milk</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>In news</h3>
        <ul className="recipe-list">
          <li>Trending Recipes</li>
          <li>Famous Chefs</li>
          <li>Latest Restaurants</li>
          <li>Magazines</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>About Us</h3>
        <ul className="recipe-list">
          <li>FAQ</li>
          <li>Our Board</li>
          <li>Our Staff</li>
          <li>Contact</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
