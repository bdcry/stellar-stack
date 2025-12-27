import { logout } from '@/services/slices/auth-slice';
import { useAppDispatch } from '@/services/store';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { NavLink, Outlet } from 'react-router-dom';

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
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link} text_color_inactive`
            }
          >
            <h2 className="text text_type_main-medium">Профиль</h2>
          </NavLink>
          <NavLink
            to="/profile/orders"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link} text_color_inactive`
            }
          >
            <h2 className="text text_type_main-medium">История заказов</h2>
          </NavLink>
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
