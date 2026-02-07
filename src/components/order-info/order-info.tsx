import { useAppSelector } from '@/services/store';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './order-info.module.css';

export const OrderInfo = (): JSX.Element => {
  const { number } = useParams();
  const feedOrders = useAppSelector(({ feed }) => feed.orders);
  const profileFeedOrders = useAppSelector(({ profileFeed }) => profileFeed.orders);
  const order =
    feedOrders.find((order) => order.number === Number(number)) ??
    profileFeedOrders.find((order) => order.number === Number(number));
  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);

  const ingredientsDetails = ingredients.filter((ingr) =>
    order?.ingredients.includes(ingr._id)
  );

  const ingredientCountMap = new Map<string, number>();
  order?.ingredients.forEach((ingrId) => {
    ingredientCountMap.set(ingrId, (ingredientCountMap.get(ingrId) ?? 0) + 1);
  });
  const ingredientsCount = (ingrId: string): number =>
    ingredientCountMap.get(ingrId) ?? 0;

  const orderTotalPrice = ingredientsDetails.reduce((acc, item) => acc + item.price, 0);

  const status = order?.status === 'done' ? 'Выполнен' : 'В работе';

  return (
    <div className={styles.info}>
      <span
        className="text text_type_digits-default mb-10"
        style={{ alignSelf: 'center' }}
      >
        #{order?.number}
      </span>
      <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
      <p className="text text_type_main-default mb-15" style={{ color: '#00CCCC' }}>
        {status}
      </p>
      <span className="text text_type_main-medium mb-6">Состав:</span>
      <ul className={`${styles.items_list} mb-10`}>
        {ingredientsDetails.map((ingredient) => (
          <li key={ingredient._id} className={styles.item_row}>
            <img
              src={ingredient.image_mobile}
              alt={ingredient.name}
              className={styles.ingredient_image}
            />
            <span className="text text_type_main-default">{ingredient.name}</span>
            <div className={styles.price}>
              <span className="text text_type_digits-default">
                {ingredientsCount(ingredient._id)} x
              </span>
              <span className="text text_type_digits-default">{ingredient.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.info_row}>
        <span className="text text_type_main-default text_color_inactive">
          {order?.createdAt && <FormattedDate date={new Date(order?.createdAt)} />}
        </span>
        <div className={styles.price}>
          <span className="text text_type_main-default">{orderTotalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
