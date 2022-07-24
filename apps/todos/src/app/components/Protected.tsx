/* eslint-disable react/jsx-no-useless-fragment */
import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context';
import { useClient } from '../hooks/useClient';
export const Protected = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { JWT } = useClient();
  if (!JWT) {
    return (
      <Navigate
        to={{ pathname: '/login' }}
        replace
        state={{ ru: location.pathname }}
      ></Navigate>
    );
  }
  return <>{children}</>;
};
