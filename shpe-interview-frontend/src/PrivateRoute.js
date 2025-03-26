import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Corrected path

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the child components
  return children;
}