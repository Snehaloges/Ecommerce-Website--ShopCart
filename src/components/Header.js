import React, { useState, useEffect } from 'react';
import '../styles/headFoot.css';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'; // Import the search and location icons

function Header() {
  const [username, setUsername] = useState('');
  const [profileName, setProfileName] = useState('');
  const [categories] = useState([
    'Fresh',
    "Today's Deals",
    'Mobiles',
    'Gift Cards',
    'Clothing',
    'Health',
    'Pet Corner',
    'Books',
    'Beauty',
    'Kitchen',
    'Bed Room',
    'Sport',
    'Bags',
  ]); // Categories to search from
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfileName = localStorage.getItem('profileName');

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedProfileName) {
      setProfileName(storedProfileName);
    }
  }, []);

  return (
    <div className="navbar-container">
      {/* First Section */}
      <div className="navbar-first-section">
        <div className="logo-container">
          <img src="/assets/images/logo.ico" alt="Shopcart Logo" className="shopcart-icon" />
          <span className="shopcart-name">
            <span className="bold-text">shop</span>
            <span className="light-text">cart</span>
          </span>
        </div>

        <div className="profile-container">
          <img src="/assets/images/profile-icon.jpeg" alt="Profile Icon" className="profile-icon" />
          <span className="profile-name">{profileName || username || 'Guest'}</span>
        </div>
      </div>

      {/* Second Section */}
      <div className="navbar-second-section">
        {/* Hardcoded Location */}
        <div className="location-container">
          <FaMapMarkerAlt className="location-icon" />
          <span className="location-name">Delhi, 110110</span>
        </div>

        {/* Static Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
          
          />
          <FaSearch className="search-bar-icon" />
        </div>
      </div>

      {/* Third Section */}
      <div className="navbar-third-section">
        {categories.map((category, index) => (
          <a key={index} href={`#${category.toLowerCase().replace(' ', '-')}`} className="category-link">
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Header;
