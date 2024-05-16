import React, { useState,useContext } from 'react';
import './Login.css';  
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate(); 
  const { setAuthToken , setUsername: setContextUsername} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { username, password });
      console.log('Authenticated:', response.data);
      setMessage('Login successful!');
      const { token} = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username',username); 
      setAuthToken(token); 
      console.log(username);
      setContextUsername( username); 
   
      history('/') 
      
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
      </form>
    </div>
  );
}

export default Login;
