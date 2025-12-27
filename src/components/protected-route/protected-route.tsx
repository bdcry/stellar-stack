import { useAppSelector } from '@/services/store';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import type { JSX } from 'react';

type IProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
}: IProtectedRouteProps): JSX.Element => {
  const auth = useAppSelector(({ auth }) => auth);
  const location = useLocation();

  if (auth.status === 'loading') {
    return <Preloader />;
  }

  if (!onlyUnAuth && !auth.isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (onlyUnAuth && auth.isAuth) {
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
