import React, { useState } from 'react';
import './Register.css';  
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { username, password });
      
      setMessage('Registration successful!');
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
        <p>Already registered? <Link to="/login" className="login-link">Login here</Link></p>
      </form>
      <footer className="footer">
        <img src="https://dailyduploads.s3.amazonaws.com/WhatsApp+Image+2024-05-16+at+09.37.18.jpeg" alt="Aziz Keskes" className="profile-pic" />
        <div className="profile-description">
          <p>My name is Aziz Keskes. I am currently pursuing a Bachelor's degree in Informatics Software Systems Science. This semester and the next, I will be focusing on completing my bachelor's degree, after which I plan to pursue my master's degree online. Meanwhile, I am eager to land a professional job to gain valuable experience in the field. I created this website to have fun with my friends and to showcase my junior programming skills to potential recruiters. The primary goal of this website is to learn microservice architecture, AWS, Docker, and more.</p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
