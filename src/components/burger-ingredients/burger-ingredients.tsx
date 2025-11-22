import {
  addFilling,
  setBun,
  type TConstructorState,
} from '@/services/slices/constructor-slice';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import IngredientsCategory from './ingredients-category/ingredients-category';

import type { AppDispatch, RootState } from '@/services/store';
import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [isActiveTab, setIsActiveTab] = useState('bun');
  const [selectedIngredientData, setSelectedIngredientData] =
    useState<TIngredient | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const burgerConstructorData = useSelector<RootState, TConstructorState>(
    ({ burgerConstructor }) => burgerConstructor
  );

  const groups = {
    bun: ingredients.filter((item) => item.type === 'bun'),
    main: ingredients.filter((item) => item.type === 'main'),
    sauce: ingredients.filter((item) => item.type === 'sauce'),
  };

  const getCount = (id: string): number => {
    return (
      (burgerConstructorData.bun?._id === id ? 2 : 0) +
      burgerConstructorData.items.filter((item) => item._id === id).length
    );
  };

  const handleTabClick = (tabName: string): void => {
    setIsActiveTab(tabName);
    const element = document.getElementById(tabName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectIngredient = (ingredient: TIngredient): void => {
    setSelectedIngredientData(ingredient);

    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addFilling(ingredient));
    }
  };

  const handleCloseModal = (): void => {
    setSelectedIngredientData(null);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={isActiveTab === 'bun'}
            onClick={() => handleTabClick('bun')}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={isActiveTab === 'sauce'}
            onClick={() => handleTabClick('sauce')}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={isActiveTab === 'main'}
            onClick={() => handleTabClick('main')}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredients_list}>
        <div id="bun">
          <IngredientsCategory
            ingredientsItems={groups.bun}
            onClick={handleSelectIngredient}
            getCount={getCount}
          />
        </div>
        <div id="sauce">
          <IngredientsCategory
            ingredientsItems={groups.sauce}
            onClick={handleSelectIngredient}
            getCount={getCount}
          />
        </div>
        <div id="main">
          <IngredientsCategory
            ingredientsItems={groups.main}
            onClick={handleSelectIngredient}
            getCount={getCount}
          />
        </div>
      </div>

      {selectedIngredientData && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails {...selectedIngredientData} />
        </Modal>
      )}
    </section>
  );
};
