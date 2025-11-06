import styles from './order-details.module.css';

const OrderDetails = (): React.JSX.Element => {
  return (
    <div className={styles.order_details}>
      <p>
        Компонент IngredientDetails содержит данные, полученные от API. Это значит, что
        при клике на ингредиент открывается модальное окно с описанием конкретного
        ингредиента.
      </p>
    </div>
  );
};

export default OrderDetails;
