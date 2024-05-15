import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setAuthToken(token);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
