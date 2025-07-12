import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('An error occurred. Please try again. ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-data">Login</h2>
          <div className="input-field">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <Link to="/">Forgot password?</Link>
          </div>
          <button type="submit">Log In</button>
          <div className="register">
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
