import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for user login authentication
 * @returns {Object} Login state and methods
 */
const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Authenticate user with the API
   * @param {Object} credentials - User credentials (username and password)
   * @returns {Promise<Object>} Authentication result
   */
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', credentials.username);
      
      const headers = {
        'Content-Type': 'application/json',
        'X-User-IP': window.location.hostname || 'unknown',
        'X-User-Lang': navigator.language || 'es-PR'
      };

      const response = await axios.post(
        'https://api.cescoonline.com/api/Cliente/login',
        {
          cl_nombreUsuario: credentials.username,
          cl_contrasena: credentials.password
        },
        { headers }
      );

      // If we reach here, login was successful
      const userData = response.data;
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        isAuthenticated: true
      }));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('Login successful:', userData);
      return { success: true, user: userData };
      
    } catch (err) {
      console.error('Login error:', err);
      
      // Extract error message from response if available
      const errorMessage = 
        err.response?.data?.message || 
        'Error de autenticación. Por favor, verifica tus credenciales e intenta nuevamente.';
      
      setError(errorMessage);
      console.log('Login failed:', errorMessage);
      return { success: false, error: errorMessage };
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  /**
   * Check if user is already authenticated (from local storage)
   */
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.isAuthenticated) {
          setUser(userData);
          setIsAuthenticated(true);
          return true;
        }
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        logout();
      }
    }
    return false;
  };

  return {
    isLoading,
    error,
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };
};

export default useLogin; 