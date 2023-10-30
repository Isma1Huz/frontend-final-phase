import React from 'react';
import './Footer.css'; // Import your CSS file for the footer

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-column">
        <h3>Fresh Recipe</h3>
        <ul>
          <li>Recipes</li>
          <li>Winter Salads</li>
          <li>Organic Chicken</li>
          <li>Beef and Mutton</li>
          <li>Flavoured Milk</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>About Us</h3>
        <ul>
        <li>FAQ</li>
        <li>Our Board</li>
        <li>Our Staff</li>
        <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>In News</h3>
        <ul>
        <li>Our Blogs</li>
        <li>Contests</li>
        <li>Video</li>
        <li>New Releases</li>
        <li>Newsletters</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
