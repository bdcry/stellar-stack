import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFillings from './constructor-fillings/constructor-fillings';
import ConstructorOrderButton from './constructor-order-button/constructor-order-button';
import ConstructorPriceDisplay from './constructor-price-display/constructor-price-display';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const fillings = ingredients.filter((ingredient) => ingredient.type !== 'bun');
  const total =
    fillings.reduce((acc, ingredient) => acc + ingredient.price, 0) +
    (bun ? bun.price * 2 : 0);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_list}>
        {bun && <ConstructorBun position="top" bun={bun} />}
        <div className={styles.scroll_area}>
          <ConstructorFillings fillings={fillings} />
        </div>
        {bun && <ConstructorBun position="bottom" bun={bun} />}
      </div>

      <div className={`${styles.price_bar} mt-10`}>
        <ConstructorPriceDisplay total={total} />
        <ConstructorOrderButton />
      </div>
    </section>
  );
};
