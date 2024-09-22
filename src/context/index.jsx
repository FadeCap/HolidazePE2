// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state

  // Example login function
  const login = () => {
    // Implement your actual login logic here (e.g., API call)
    setIsAuthenticated(true);
  };

  // Example logout function
  const logout = () => {
    // Implement your actual logout logic here
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
