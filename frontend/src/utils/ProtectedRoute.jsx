// src/auth/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
         console.log(isAuthenticated);
         
  if (isAuthenticated === null) return <p>Loading...</p>; // or spinner
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};
