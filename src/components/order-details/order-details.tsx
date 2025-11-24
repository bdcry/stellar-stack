import { useAppSelector } from '@/services/store';
import { CheckMarkIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

const OrderDetails = (): React.JSX.Element => {
  const orderNumber = useAppSelector(({ orderInfo }) => orderInfo.orderNumber);
  const isLoading = useAppSelector(({ orderInfo }) => orderInfo.status);

  return (
    <div className={styles.order_details}>
      {isLoading === 'loading' ? (
        <Preloader />
      ) : (
        <>
          <h2 className={`${styles.order_number} text text_type_digits-large`}>
            {orderNumber}
          </h2>
          <p className={`${styles.order_id} text text_type_main-medium`}>
            идентификатор заказа
          </p>
          <div className={styles.check_icon}>
            <CheckMarkIcon type="primary" className={styles.check_mark_icon} />
          </div>
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
