import { fetchIngredients } from '@/services/slices/ingredients-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { AppDispatch, RootState } from '@/services/store';
import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const ingredientsData = useSelector<RootState, TIngredient[]>(
    ({ ingredients }) => ingredients.items
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {ingredientsData.length > 0 && (
          <>
            <BurgerIngredients ingredients={ingredientsData} />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
