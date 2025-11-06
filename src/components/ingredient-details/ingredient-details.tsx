import styles from './ingredient-details.module.css';

const IngredientDetails = (): React.JSX.Element => {
  return (
    <div className={styles.ingredient_details}>
      <p>
        Компонент OrderDetails содержит тестовые данные. Вы ещё не реализовали
        функциональность создания заказа, поэтому используйте тексты из макета. В
        дальнейшем номер заказа и другие данные будут приходить с сервера, но подумать о
        месте для хранения тестовых данных нужно уже сейчас.
      </p>
    </div>
  );
};

export default IngredientDetails;
