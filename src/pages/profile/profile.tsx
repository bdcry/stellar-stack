import { logout } from '@/services/slices/auth-slice';
import { useAppDispatch } from '@/services/store';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link, Outlet } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './profile.module.css';

export const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    void dispatch(logout());
  };

  return (
    <div className={styles.profile}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Link className={styles.link} to="/profile">
            <h2 className="text text_type_main-medium">Профиль</h2>
          </Link>
          <Link className={styles.link} to="/profile/orders">
            <h2 className="text text_type_main-medium text_color_inactive">
              История заказов
            </h2>
          </Link>
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={handleLogout}
            extraClass={styles.logoutButton}
          >
            <span className="text text_type_main-medium text_color_inactive">Выход</span>
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
