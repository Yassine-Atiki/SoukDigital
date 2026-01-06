// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [isLoading, setIsLoading] = useState(true);

  // Check for persisted session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setUserType(currentUser.userType || 'customer');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email, password, selectedUserType) => {
    const result = await AuthService.login(email, password, selectedUserType);

    if (result.success) {
      setUser(result.user);
      setUserType(result.user.userType);
      setIsAuthenticated(true);
    }

    return result;
  };

  // Signup function
  const signup = async (fullName, email, password, selectedUserType) => {
    const result = await AuthService.signup(fullName, email, password, selectedUserType);

    if (result.success) {
      setUser(result.user);
      setUserType(result.user.userType);
      setIsAuthenticated(true);
    }

    return result;
  };

  // Logout function
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setUserType('customer');
  };

  // Update user profile
  const updateProfile = async (updates) => {
    const result = await AuthService.updateProfile(updates);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const value = {
    user,
    isAuthenticated,
    userType,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
