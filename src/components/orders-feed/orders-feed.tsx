import { useAppSelector } from '@/services/store';
import { useLocation, useNavigate } from 'react-router-dom';

import { OrderCard } from '../order-card/order-card';

import type { JSX } from 'react';

import styles from './orders-feed.module.css';

export const OrdersFeed = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const orders = useAppSelector(({ feed }) => feed.orders);

  const handleOrderClick = (orderId: number): void => {
    void navigate(`/feed/${orderId}`, { state: { background: location } });
  };
  return (
    <section className={styles.feed_section}>
      <div className={styles.feed_list}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} onCardClick={handleOrderClick} />
        ))}
      </div>
    </section>
  );
};
