import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null
}) => {
  const { user } = useAuthStore();

  // High-fidelity permission check
  const hasPermission = user?.role === 'platform_admin' || user?.permissions?.includes(permission);

  if (!hasPermission) return <>{fallback}</>;
  return <>{children}</>;
};
