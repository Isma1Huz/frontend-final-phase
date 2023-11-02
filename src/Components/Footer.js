import "./Footer.css";

// const footerMenus = [
//   {
//     title: 'Fresh Recipe',
//     items: ['Home', 'News', 'About Us', 'Recipes', 'Our Blogs'],
//   },
//   {
//     title: 'FAQ',
//     items: ['Winter Salads', 'Contests/Sweepsatkes', 'Our Board', 'Organic Chicken', 'Video'],
//   },
//   {
//     title: 'Our Staff',
//     items: ['Beef and Mutton', 'New Releases', 'Contact Us', 'Flavored Milk', 'Newsletters'],
//   },
//   {
//     title: 'Our Staff',
//     items: ['Beef and Mutton', 'New Releases', 'Contact Us', 'Flavored Milk', 'Newsletters'],
//   },
// ];

// function Footer() {
//   return (
//     <div className="footer">
//       {footerMenus.map((menu, index) => (
//         <ul key={index}>
//           <li style={{ fontWeight: 'bold', color: 'white' , listStyleType: 'none'}}>{menu.title}</li>
//           {menu.items.map((item, itemIndex) => (
//             <li key={itemIndex}>
//               <a href="#">{item}</a>
//             </li>
//           ))}
//         </ul>
//       ))}
//     </div>
//   );
//   //
// }

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-cover">
        <div className="log-copyright">
          <h6 className="logo">
            Re<span>st</span>Room
          </h6>
          <h6 className="copyright">All Rights Reserved</h6>
          <div className="social-icons">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-pinterest-p" aria-hidden="true"></i>
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
          </div>
        </div>
        <div className="fresh-recipe-news">
          <div className="fresh-recipes">
            <h3 className="footer-items-title">Fresh Recipe</h3>
            <ul className="footer-items">
              <li>Recipes</li>
              <li>Winter salads</li>
              <li>Organic chicken</li>
              <li>Beef and Mutton</li>
              <li>Flavoured Milk</li>
            </ul>
          </div>
          <div className="in-news">
            <h3 className="footer-items-title">In News</h3>
            <ul className="footer-items">
              <li>Our Blogs</li>
              <li>Contests/Sweepsatkes</li>
              <li>Video</li>
              <li>New Releases</li>
              <li>Newsletters</li>
            </ul>
          </div>
        </div>
        <div className="about-us">
          <h3 className="footer-items-title">About Us</h3>
          <ul className="footer-items">
            <li>FAQ</li>
            <li>Our Board</li>
            <li>Our Staff</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
