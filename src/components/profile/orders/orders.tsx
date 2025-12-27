import type { JSX } from 'react';

import styles from './orders.module.css';

export const Orders = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-large">История заказов</p>
      <p className="text text_type_main-default mt-20">
        Эта страница в разработке, ожидайте...
      </p>
    </div>
  );
};
