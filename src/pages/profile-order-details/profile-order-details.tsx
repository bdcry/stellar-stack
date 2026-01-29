import { OrderInfo } from '@/components/order-info/order-info';

import type { JSX } from 'react';

import styles from './profile-order-details.module.css';

export const ProfileOrderDetailsPage = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <OrderInfo />
    </div>
  );
};
