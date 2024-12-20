import React from 'react';
import '../styles/headFoot.css';
import { FaChevronDown } from 'react-icons/fa';


function Footer({hide}) {
  return (
    <div className={`footer-container ${hide ? "hidden" : ""}`}>
      {/* Left Section */}
      <div className="footer-left">
        <span className="shopcart-name">
          <span className="first-text">shop</span>
          <span className="second-text">cart</span>
        </span>
      </div>

      {/* Center Section */}
      <div className="footer-center">
        <a href="/aboutus" className="footer-link">About Us</a>
        <a href="/contact" className="footer-link">Contact</a>
        <a href="/help" className="footer-link">Help</a>
      </div>

      {/* Right Section */}
      <div className="footer-right">
        <div className="language-container">
          <img
            src="/assets/images/Flag.jpeg"
            alt="Indian Flag"
            className="flag-icon"
          />
          <select className="language-selector">
            <option value="en">English</option>
            <option value="es">Tamil</option>
            <option value="fr">Hindi</option>
          </select>
          <FaChevronDown className="chevron-icon" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
