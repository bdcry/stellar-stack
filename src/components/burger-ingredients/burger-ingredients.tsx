import {
  addFilling,
  setBun,
  type TConstructorState,
} from '@/services/slices/constructor-slice';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '@/services/slices/currentIngredient-slice';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const burgerConstructorData = useSelector<RootState, TConstructorState>(
    ({ burgerConstructor }) => burgerConstructor
  );
  const selectedIngredientData = useSelector<RootState, TIngredient | null>(
    ({ currentIngredient }) => currentIngredient.current
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

  const handleScroll = (): void => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const bunSection = document.getElementById('bun');
    const sauceSection = document.getElementById('sauce');
    const mainSection = document.getElementById('main');

    if (!bunSection || !sauceSection || !mainSection) return;

    const bunRect = bunSection.getBoundingClientRect();
    const sauceRect = sauceSection.getBoundingClientRect();
    const mainRect = mainSection.getBoundingClientRect();

    const bunDistance = Math.abs(bunRect.top - containerRect.top);
    const sauceDistance = Math.abs(sauceRect.top - containerRect.top);
    const mainDistance = Math.abs(mainRect.top - containerRect.top);

    const activeTab =
      bunDistance < sauceDistance && bunDistance < mainDistance
        ? 'bun'
        : sauceDistance < mainDistance
          ? 'sauce'
          : 'main';

    setIsActiveTab(activeTab);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return (): void => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSelectIngredient = (ingredient: TIngredient): void => {
    dispatch(setCurrentIngredient(ingredient));

    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addFilling(ingredient));
    }
  };

  const handleCloseModal = (): void => {
    dispatch(clearCurrentIngredient());
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
      <div className={styles.ingredients_list} ref={containerRef}>
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
