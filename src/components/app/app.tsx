import { checkAuth } from '@/services/slices/auth-slice';
import { useAppDispatch } from '@/services/store';
import { useEffect, type JSX } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { Home } from '../../pages/home/home';
import { IngredientDetailsPage } from '../../pages/ingredient-details/ingredient-details';
import { Layout } from '../../pages/layout/layout';
import { Login } from '../../pages/login/login';
import { NotFound } from '../../pages/not-found/not-found';
import { Profile } from '../../pages/profile/profile';
import { Register } from '../../pages/register/register';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { OrderDetails } from '../profile/order-details';
import { Orders } from '../profile/orders/orders';
import { ProfileForm } from '../profile/profile-form/profile-form';
import { ProtectedRoute } from '../protected-route/protected-route';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = (location.state as { background?: unknown })?.background as
    | typeof location
    | undefined;

  useEffect(() => {
    void dispatch(checkAuth());
  }, []);

  const handleModalClose = (): void => {
    void navigate(-1);
  };

  return (
    <>
      <Routes location={background ?? location}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<div>Ещё в разработке! Приходите позже</div>} />
          <Route path="/ingredients/:ingredientId" element={<IngredientDetailsPage />} />

          <Route element={<ProtectedRoute onlyUnAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:number" element={<OrderDetails />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
