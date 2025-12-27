import { useEffect } from 'react';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

import styles from './ingredient-details.module.css';

export const IngredientDetailsPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (ingredients.length === 0) {
      void dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
