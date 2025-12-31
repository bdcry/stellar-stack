import { useAppSelector } from '@/services/store';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { useIngredientsLogic } from './hooks/useIngredientsLogic';
import IngredientsCategory from './ingredients-category/ingredients-category';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);

  const {
    containerRef,
    bunSectionRef,
    sauceSectionRef,
    mainSectionRef,
    isActiveTab,
    groups,
    getCount,
    handleTabClick,
  } = useIngredientsLogic(ingredients);

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
        <div id="bun" ref={bunSectionRef}>
          <IngredientsCategory ingredientsItems={groups.bun} getCount={getCount} />
        </div>
        <div id="sauce" ref={sauceSectionRef}>
          <IngredientsCategory ingredientsItems={groups.sauce} getCount={getCount} />
        </div>
        <div id="main" ref={mainSectionRef}>
          <IngredientsCategory ingredientsItems={groups.main} getCount={getCount} />
        </div>
      </div>
    </section>
  );
};
