import { OrderCard } from '@/components/order-card/order-card';
import { useLocation, useNavigate } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './profile-orders.module.css';

const testData = {
  success: true,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0942',
      ],
      _id: '',
      status: 'done',
      number: 12345,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ],
  total: 1,
  totalToday: 1,
};

export const ProfileOrders = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOrderClick = (orderId: number): void => {
    void navigate(`/profile/orders/${orderId}`, { state: { background: location } });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <OrderCard order={testData.orders[0]} onCardClick={handleOrderClick} />
        <OrderCard order={testData.orders[0]} onCardClick={handleOrderClick} />
        <OrderCard order={testData.orders[0]} onCardClick={handleOrderClick} />
        <OrderCard order={testData.orders[0]} onCardClick={handleOrderClick} />
        <OrderCard order={testData.orders[0]} onCardClick={handleOrderClick} />
      </div>
    </div>
  );
};
