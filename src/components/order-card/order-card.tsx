import { useAppSelector } from '@/services/store';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './order-card.module.css';

export const OrderCard = ({
  order,
  onCardClick,
}: {
  order: {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  onCardClick: (orderId: number) => void;
}): JSX.Element => {
  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);
  const orderIngredients = ingredients.filter((item) =>
    order.ingredients.includes(item._id)
  );

  const remainingCount = orderIngredients.length - 6;
  const orderTotalPrice = order.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    return total + (ingredient?.price ?? 0);
  }, 0);

  return (
    <div className={styles.card} onClick={() => onCardClick(order.number)}>
      <div className={styles.content}>
        <div className={styles.info_row}>
          <span className="text text_type_main-default">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </span>
        </div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        <div className={styles.order_info}>
          <ul className={styles.ingredients_list}>
            {orderIngredients.slice(0, 6).map((ingredient, index) => (
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
