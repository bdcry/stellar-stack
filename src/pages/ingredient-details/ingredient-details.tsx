import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient-details.module.css';

export const IngredientDetailsPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
