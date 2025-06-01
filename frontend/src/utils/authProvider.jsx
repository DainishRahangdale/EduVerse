// src/auth/AuthProvider.js
import { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: loading


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth');
        console.log(res);
         
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await api.post('/logout');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
