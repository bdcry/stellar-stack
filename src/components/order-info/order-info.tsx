import { useAppSelector } from '@/services/store';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './order-info.module.css';

const testData = {
  success: true,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0942',
      ],
      _id: '',
      status: 'done',
      number: 12345,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ],
  total: 1,
  totalToday: 1,
};

export const OrderInfo = (): JSX.Element => {
  const ingredients = useAppSelector(({ ingredients }) => ingredients.items);
  const ingredientsDetails = ingredients.filter((ingr) =>
    testData.orders[0].ingredients.includes(ingr._id)
  );
  const status = testData.orders[0].status === 'done' ? 'Выполнен' : 'Готовится';
  return (
    <div className={styles.info}>
      <span
        className="text text_type_digits-default mb-10"
        style={{ alignSelf: 'center' }}
      >
        #{testData.orders[0].number}
      </span>
      <h2 className="text text_type_main-medium mb-3">
        Death Star Starship Main бургер
      </h2>
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
              <span className="text text_type_digits-default">2 x</span>
              <span className="text text_type_digits-default">{ingredient.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.info_row}>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 22:35
        </span>
        <div className={styles.price}>
          <span className="text text_type_main-default">510</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
