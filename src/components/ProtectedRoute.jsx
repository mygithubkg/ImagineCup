import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    // Parse user data to check if it's a guest/demo user
    let isGuest = false;
    if (user) {
      try {
        const userData = JSON.parse(user);
        isGuest = userData.type === 'guest';
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
    
    // Allow access if user is authenticated OR in guest/demo mode
    if (!user || (!token && !isGuest)) {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
