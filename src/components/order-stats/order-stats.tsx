import { useAppSelector } from '@/services/store';

import type { JSX } from 'react';

import styles from './order-stats.module.css';

export const OrdersStats = (): JSX.Element => {
  const total = useAppSelector(({ feed }) => feed.total);
  const totalToday = useAppSelector(({ feed }) => feed.totalToday);

  const orders = useAppSelector(({ feed }) => feed.orders);

  const readyOrders = orders.filter((order) => order.status === 'done');
  const inProgressOrders = orders.filter((order) => order.status !== 'done');

  return (
    <section className={styles.stats_section}>
      <div className={styles.wrapper}>
        <div className={styles.orders_list}>
          <span className="text text_type_main-medium mb-6">Готовы:</span>
          <ul className={styles.ready_orders}>
            {readyOrders.slice(0, 20).map((order) => (
              <li
                key={order._id}
                className={`${styles.ready_number} text text_type_digits-default`}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.orders_list}>
          <span className="text text_type_main-medium mb-6">В работе:</span>
          <ul className={styles.orders_in_progress}>
            {inProgressOrders.slice(0, 20).map((order) => (
              <li key={order._id} className="text text_type_digits-default">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.stats_summary}>
        <span className="text text_type_main-large">Выполнено за всё время:</span>
        <span className={`${styles.color_number} text text_type_digits-large`}>
          {total}
        </span>
      </div>
      <div className={styles.stats_summary}>
        <span className="text text_type_main-large">Выполнено за сегодня:</span>
        <span className={`${styles.color_number} text text_type_digits-large`}>
          {totalToday}
        </span>
      </div>
    </section>
  );
};
