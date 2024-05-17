import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setAuthToken(token);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  const isLoggedIn = () => !!authToken;  // Check if there is an auth token
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    localStorage.removeItem('username')
    setAuthToken(null); // Clear auth token from state
    setUsername(null); // Clear username from state
    window.location.reload() // Redirect to login page
    console.log("logout test")
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, username, setUsername, isLoggedIn,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
