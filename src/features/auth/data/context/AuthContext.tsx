import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/redux';
import { setUser, setRole, logout } from '@store/slices/authSlice';
import api from '@lib/api/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  loading: boolean;
  user: any;
  authError: any;
  login: (token: string, role: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validateToken = useCallback(async (token: string | null) => {
    try {
      if (!token) return false;
      
      const response = await api.get('/auth/validate-token').catch(err => {
        return { valid: false };
      });
      
      const isValid = response && (response.valid === true || response === true);
      
      return isValid;
    } catch (error: unknown) {
      return false;
    }
  }, []);
  const checkAuth = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
    if (!token) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      setAuthError(null);
      setLoading(false);
      return;
    }
    try {
      const isValid = await validateToken(token);
      
      if (isValid) {
        setIsAuthenticated(true);
        setUserRole(role || 'USER');
        setAuthError(null);
        dispatch(setRole(role || 'USER'));
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        setAuthError('Ваша сесія закінчилася. Будь ласка, увійдіть знову.');
      }
    } catch (error: unknown) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      setAuthError('Failed to verify authentication status. Please log in again.');
    } finally {
      setLoading(false);
    }
  }, [validateToken]);
  const login = async (token: string, role: string): Promise<void> => {
    if (!token) {
      const error = new Error('No authentication token provided');
      setAuthError('No authentication token provided');
      throw error;
    }
    
    try {
      localStorage.setItem('jwtToken', token);
      if (role) {
        localStorage.setItem('userRole', role);
      }
      
      const isValid = await validateToken(token);
      
      if (!isValid) {
        throw new Error('Token validation failed');
      }
      
      setIsAuthenticated(true);
      setUserRole(role || 'USER');
      setAuthError(null);
      dispatch(setRole(role || 'USER'));
      
      return;
    } catch (error: unknown) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUserRole(null);
      const errorMessage = (error as Error)?.message || 'Login failed';
      setAuthError(errorMessage);
      throw error;
    }
  };
  const logout = useCallback((): void => {
    try {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
      
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      setAuthError(null);
      dispatch(logout() as any);
      
      navigate('/login', { replace: true });
    } catch (error: unknown) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (loading) {
    return <div>Loading authentication...</div>;
  }
  const contextValue = {
    isAuthenticated,
    userRole,
    user,
    loading,
    authError: authError || null,
    login,
    logout,
    register: async () => {},
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
