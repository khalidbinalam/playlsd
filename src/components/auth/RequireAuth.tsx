
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page, but save the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // If admin is required but user is not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
