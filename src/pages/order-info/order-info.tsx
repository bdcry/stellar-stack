import { OrderInfo } from '@/components/order-info/order-info';

import type { JSX } from 'react';

import styles from './order-info.module.css';

export const OrderInfoPage = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <OrderInfo />
    </div>
  );
};
