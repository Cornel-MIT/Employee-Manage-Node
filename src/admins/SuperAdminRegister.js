import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SuperAdminRegister.css';  

const SuperAdminRegister = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/superadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Super Admin Registered successfully');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Error registering Super Admin');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="super-admin-register">
      <h2>Super Admin Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <label>Name:</label>
          <input
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Confirm Password:</label>
          <input
            className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-container">
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      <div className="login-link">
        Already have an account? <Link to="/superadmin/login">Login</Link>
      </div>
    </div>
  );
};

export default SuperAdminRegister;
