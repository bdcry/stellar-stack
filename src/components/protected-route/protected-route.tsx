import { useAppSelector } from '@/services/store';
import { Outlet, Navigate } from 'react-router-dom';

import type { JSX } from 'react';

export const ProtectedRoute = (): JSX.Element => {
  // если идёт запрос на бек для обработки пользователя, то показываем прелоадер
  // если пользователь не найден или не зарегистрирован, то редирект на логин
  // если маршрут оказывается не для авторизованного пользователя, а попадает на неё авторизованный, то мы должны редиректить авторизованного пользователя на предыдущий шаг из location.state или на главную страницу

  const isAuth = useAppSelector(({ auth }) => auth.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
