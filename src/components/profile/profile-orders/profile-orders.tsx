import { OrderCard } from '@/components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { profileWsConnect, profileWsDisconnect } from '@/services/ws-actions/actions';
import { WS_URL } from '@/utils/api';
import { useEffect, type JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('accessToken')?.split(' ')[1] ?? '';

  const orders = useAppSelector(({ profileFeed }) => profileFeed.orders);

  useEffect(() => {
    void dispatch(profileWsConnect(`${WS_URL}?token=${token}`));

    return (): void => {
      void dispatch(profileWsDisconnect());
    };
  }, []);

  const handleOrderClick = (orderId: number): void => {
    void navigate(`/profile/orders/${orderId}`, { state: { background: location } });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <OrderCard key={order._id} order={order} onCardClick={handleOrderClick} />
          ))}
      </div>
    </div>
  );
};
