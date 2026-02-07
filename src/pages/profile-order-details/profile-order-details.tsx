import { OrderInfo } from '@/components/order-info/order-info';
import { useAppDispatch } from '@/services/store';
import { profileWsConnect, profileWsDisconnect } from '@/services/ws-actions/actions';
import { WS_URL } from '@/utils/api';
import { useEffect, type JSX } from 'react';

import styles from './profile-order-details.module.css';

export const ProfileOrderDetailsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('accessToken')?.split(' ')[1] ?? '';

  useEffect(() => {
    dispatch(profileWsConnect(`${WS_URL}?token=${token}`));
    return (): void => void dispatch(profileWsDisconnect());
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <OrderInfo />
    </div>
  );
};
