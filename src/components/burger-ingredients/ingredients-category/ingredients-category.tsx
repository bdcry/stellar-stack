import IngredientsCard from '../ingredients-card/ingredients-card';

import type { TIngredient } from '@/utils/types';

import styles from './ingredients-category.module.css';

type TIngredientsItemsProps = {
  ingredientsItems: TIngredient[];
  onClick: (ingredient: TIngredient) => void;
  getCount: (id: string) => number;
};

type TCategoryTitles = Record<string, string>;

const CATEGORY_TITLES: TCategoryTitles = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

const IngredientsCategory = ({
  ingredientsItems,
  onClick,
  getCount,
}: TIngredientsItemsProps): React.JSX.Element => {
  const categoryName = ingredientsItems[0].type;

  const title = CATEGORY_TITLES[categoryName];

  return (
    <>
      <h2 className="text mt-10 mb-6">{title}</h2>
      <ul className={styles.ingredients_category}>
        {ingredientsItems.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientsCard
              {...ingredient}
              onClick={() => onClick(ingredient)}
              count={getCount(ingredient._id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default IngredientsCategory;
