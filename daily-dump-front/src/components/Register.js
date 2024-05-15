import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure this path is correct

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { username, password });
      setMessage('Registration successful');
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed');
      console.error('There was an error!', error);
    }
  };

  // Ensure the use of CSS classes for centering and proper width control
  return (
    <div className="register-container">  
      <form onSubmit={handleSubmit} className="register-form"> 
        <h2>Register</h2>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contact" />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
