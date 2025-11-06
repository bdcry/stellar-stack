import { API_URL } from '@/utils/api';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

type TApiResponse = {
  success: boolean;
  data: TIngredient[];
};

export const App = (): React.JSX.Element => {
  const [ingredientsData, setIngredientsData] = useState<TIngredient[]>([]);

  useEffect(() => {
    const getIngredientsData = (): void => {
      fetch(`${API_URL}ingredients`)
        .then((response) => response.json())
        .then((res: TApiResponse) => setIngredientsData(res.data))
        .catch((err) => console.error('Error fetching ingredients:', err));
    };

    getIngredientsData();
  }, []);

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
            <BurgerConstructor ingredients={ingredientsData} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
