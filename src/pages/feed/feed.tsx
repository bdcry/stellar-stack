import { OrdersStats } from '@/components/order-stats/order-stats';
import { OrdersFeed } from '@/components/orders-feed/orders-feed';

import type { JSX } from 'react';

import styles from './feed.module.css';

export const Feed = (): JSX.Element => {
  return (
    <div className={styles.feed}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </h1>
      <section className={`${styles.section}`}>
        <OrdersFeed />
        <OrdersStats />
      </section>
    </div>
  );
};
