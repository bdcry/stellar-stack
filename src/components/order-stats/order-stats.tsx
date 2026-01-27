import type { JSX } from 'react';

import styles from './order-stats.module.css';

export const OrdersStats = (): JSX.Element => {
  return (
    <section className={styles.stats_section}>
      <div className={styles.wrapper}>
        <div className={styles.orders_list}>
          <span className="text text_type_main-medium mb-6">Готовы:</span>
          <ul className={styles.ready_orders}>
            <li className={`${styles.ready_number} text text_type_digits-default`}>
              0345533
            </li>
            <li className={`${styles.ready_number} text text_type_digits-default`}>
              0345515
            </li>
            <li className={`${styles.ready_number} text text_type_digits-default`}>
              0345512
            </li>
            <li className={`${styles.ready_number} text text_type_digits-default`}>
              0345513
            </li>
            <li className={`${styles.ready_number} text text_type_digits-default`}>
              0345510
            </li>
          </ul>
        </div>
        <div className={styles.orders_list}>
          <span className="text text_type_main-medium mb-6">В работе:</span>
          <ul className={styles.orders_in_progress}>
            <li className="text text_type_digits-default">03458</li>
            <li className="text text_type_digits-default">03459</li>
            <li className="text text_type_digits-default">03460</li>
            <li className="text text_type_digits-default">03461</li>
            <li className="text text_type_digits-default">03462</li>
          </ul>
        </div>
      </div>
      <div className={styles.stats_summary}>
        <span className="text text_type_main-large">Выполнено за всё время:</span>
        <span className={`${styles.color_number} text text_type_digits-large`}>
          28752
        </span>
      </div>
      <div className={styles.stats_summary}>
        <span className="text text_type_main-large">Выполнено за сегодня:</span>
        <span className={`${styles.color_number} text text_type_digits-large`}>138</span>
      </div>
    </section>
  );
};
