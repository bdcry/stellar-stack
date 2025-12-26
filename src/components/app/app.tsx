import { checkAuth } from '@/services/slices/auth-slice';
import { useAppDispatch } from '@/services/store';
import { useEffect, type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { Home } from '../../pages/home/home';
import { Layout } from '../../pages/layout/layout';
import { Login } from '../../pages/login/login';
import { Profile } from '../../pages/profile/profile';
import { Register } from '../../pages/register/register';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProtectedRoute } from '../protected-route/protected-route';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkAuth());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/feed" element={<div>Ещё в разработке! Приходите позже</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* пока что просто заглушка. компонент и его вложенные пути добавлю позже */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
