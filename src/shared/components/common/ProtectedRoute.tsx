import React from 'react';
import { useAppSelector } from '../../../hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: string;
  accessDeniedMessage?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  accessDeniedMessage = 'You must be logged in to access this page.' 
}) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">{accessDeniedMessage}</p>
        </div>
      </div>
    );
  }

  if (requiredRole && role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You must be an {requiredRole} to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

