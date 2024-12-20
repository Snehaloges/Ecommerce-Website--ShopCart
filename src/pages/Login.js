import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate to navigate to different routes

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Check if both email and password fields are filled
    if (email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Make the POST request to your backend
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      // Alert the response message from the server
      alert(response.data.message);

      // After successful login, prompt the user to enter their profile name
      const enteredProfileName = prompt('Please enter your profile name:');
      
      if (enteredProfileName) {
        // Store the profile name and username in localStorage
        localStorage.setItem('profileName', enteredProfileName);
        localStorage.setItem('username', response.data.username); // Assuming the backend returns a username

        // Navigate to the home page
        navigate('/home');
      } else {
        alert('Profile name is required');
      }
    } catch (error) {
      // Handle errors if the request fails
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      {/* Left Container */}
      <div className="left-container">
        <img
          src="/assets/images/shopcartimg.png"
          alt="Shopcart"
          className="shop-image"
        />
      </div>

      {/* Right Container */}
      <div className='full-container'>
        <div className="right-container">
          <h1 className="shopcart-heading">
            <img
              src="/assets/images/logo.ico"
              alt="shopbag"
              className="shopcart-icon"
            />
            <b>shop</b> cart
          </h1>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="shopnow-btn">
              Shopnow
            </button>
            <p>
              Don’t have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
