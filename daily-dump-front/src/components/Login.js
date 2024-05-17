import React, { useState, useContext } from 'react';
import './Login.css';  
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const { setAuthToken, setUsername: setContextUsername } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { username, password });
      
      setMessage('Login successful!');
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username); 
      setAuthToken(token); 
      setContextUsername(username); 
      
      console.log('Authenticated:', response.data);
      window.location.reload();
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
        <p>Not yet registered? <Link to="/register" className="register-link">Sign up now</Link></p>
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

export default Login;
