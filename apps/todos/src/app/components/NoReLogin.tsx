/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context';

export const NoRelogin = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { accessToken } = useAuthContext();
  if (accessToken) {
    const navTo = (location.state as { ru: string })?.ru ?? '/';
    return <Navigate to={navTo} replace />;
  }
  return <>{children}</>;
};
