import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { Home } from '../../pages/home/home';
import { Layout } from '../../pages/layout/layout';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProtectedRoute } from '../protected-route/protected-route';

import type { JSX } from 'react';

export const App = (): JSX.Element => {
  const isAuth = false; // позже заменю подтягиванием из стора
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/profile" element={<div>Профиль</div>} />
            {/* пока что просто заглушка. компонент и его вложенные пути добавлю позже */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
