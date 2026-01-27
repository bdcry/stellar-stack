import { useAppSelector } from '@/services/store';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './order-card.module.css';

export const OrderCard = ({
  order,
}: {
  order: {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
  };
}): JSX.Element => {
  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);
  const orderIngredientsImage = ingredients.filter((item) =>
    order.ingredients.includes(item._id)
  );

  const remainingCount = orderIngredientsImage.length - 6;

  const orderTotalPrice = orderIngredientsImage.reduce(
    (acc, item) => acc + item.price,
    0
  );
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info_row}>
          <span className="text text_type_main-default">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            Сегодня, 22:35
          </span>
        </div>
        <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
        <div className={styles.order_info}>
          <ul className={styles.ingredients_list}>
            {orderIngredientsImage.slice(0, 6).map((ingredient, index) => (
              <li className={styles.ingredient_item} key={ingredient._id}>
                <img
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  className={styles.ingredient_image}
                  style={index === 5 && remainingCount > 0 ? { opacity: 0.7 } : {}}
                />
                {index === 5 && remainingCount > 0 && (
                  <span
                    className={`${styles.remaining_overlay} text text_type_digits-default`}
                  >
                    +{remainingCount}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.price}>
            <span className="text text_type_main-default">{orderTotalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
