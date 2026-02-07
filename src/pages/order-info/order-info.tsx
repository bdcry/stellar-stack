import { OrderInfo } from '@/components/order-info/order-info';
import { useAppDispatch } from '@/services/store';
import { feedWsConnect, feedWsDisconnect } from '@/services/ws-actions/actions';
import { WS_URL } from '@/utils/api';
import { useEffect, type JSX } from 'react';

import styles from './order-info.module.css';

export const OrderInfoPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedWsConnect(`${WS_URL}/all`));
    return (): void => void dispatch(feedWsDisconnect());
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <OrderInfo />
    </div>
  );
};
