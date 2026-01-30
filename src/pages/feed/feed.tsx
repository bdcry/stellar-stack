import { OrdersStats } from '@/components/order-stats/order-stats';
import { OrdersFeed } from '@/components/orders-feed/orders-feed';
import { useAppDispatch } from '@/services/store';
import { feedWsConnect, feedWsDisconnect } from '@/services/ws-actions/actions';
import { useEffect, type JSX } from 'react';

import styles from './feed.module.css';

const WS_URL = 'wss://norma.education-services.ru/orders/all';

export const Feed = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(feedWsConnect(WS_URL));

    return (): void => {
      void dispatch(feedWsDisconnect());
    };
  }, [dispatch]);
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
