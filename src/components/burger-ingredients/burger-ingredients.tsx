import { useAppSelector } from '@/services/store';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useIngredientsLogic } from './hooks/useIngredientsLogic';
import IngredientsCategory from './ingredients-category/ingredients-category';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const selectedIngredientData = useAppSelector(
    ({ currentIngredient }) => currentIngredient.current
  );

  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);

  const {
    containerRef,
    isActiveTab,
    groups,
    getCount,
    handleTabClick,
    handleSelectIngredient,
    handleCloseModal,
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
