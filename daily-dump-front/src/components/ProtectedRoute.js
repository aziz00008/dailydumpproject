import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';  // Make sure the path is correct

const ProtectedRoute = ({ children }) => {

  const { isLoggedIn } = useContext(AuthContext);
console.log(isLoggedIn()+" test bool value")
  if (isLoggedIn()==false) {
    // Redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
