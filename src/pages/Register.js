import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate(); // Initialize navigate to navigate to different routes
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Validate that passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        password,
      });

      // Display alert with response message
      alert(response.data.message);

      // Navigate to the Login page on successful registration
      navigate('/'); // Navigate to the Login page
    } catch (error) {
      // Handle any errors (e.g., if the server responds with an error)
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="shopcart-heading">
          <img src="/assets/images/logo.ico" alt="shopbag" className="shopcart-icon" />
          <b>shop</b><span id="inner">cart</span>
        </h1>
        <h2>Create an Account</h2>
      </div>
      <div className="inside-container">
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="shopnow-btn">Signup</button>
            <p>Already have an account? <a href="/">Login</a></p>
          </form>
        </div>
        <div className="image-container">
          <img src="/assets/images/signupimg.png" alt="Shopcart" className="shop-image" />
        </div>
      </div>
    </div>
  );
}

export default Register;
