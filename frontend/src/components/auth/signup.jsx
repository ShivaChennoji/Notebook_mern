import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match') 
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
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
        navigate('/login');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  return ( <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-data">Sign up</h2>
          <div className="input-field">
            <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)}  required/>
              <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <label>Enter your password</label>
          </div>
           <div className="input-field">
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
              <label>Enter your password</label>
          </div>
          <button type="submit">Sign In</button>
          <div className="register">
            <p>Do you have an account already..? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>)
};

export default Signup;
