import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import IngredientsCategory from './ingredients-category/ingredients-category';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [isActiveTab, setIsActiveTab] = useState('bun');

  const groups = {
    bun: ingredients.filter((item) => item.type === 'bun'),
    main: ingredients.filter((item) => item.type === 'main'),
    sauce: ingredients.filter((item) => item.type === 'sauce'),
  };

  const handleTabClick = (tabName: string): void => {
    setIsActiveTab(tabName);
    const element = document.getElementById(tabName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          <IngredientsCategory ingredientsItems={groups.bun} />
        </div>
        <div id="sauce">
          <IngredientsCategory ingredientsItems={groups.sauce} />
        </div>
        <div id="main">
          <IngredientsCategory ingredientsItems={groups.main} />
        </div>
      </div>
    </section>
  );
};
