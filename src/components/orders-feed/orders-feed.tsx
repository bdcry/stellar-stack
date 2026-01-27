import { OrderCard } from '../order-card/order-card';

import type { JSX } from 'react';

import styles from './orders-feed.module.css';

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

export const OrdersFeed = (): JSX.Element => {
  return (
    <section className={styles.feed_section}>
      <div className={styles.feed_list}>
        <OrderCard order={testData.orders[0]} />
      </div>
    </section>
  );
};
