import { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFillings from './constructor-fillings/constructor-fillings';
import ConstructorOrderButton from './constructor-order-button/constructor-order-button';
import ConstructorPriceDisplay from './constructor-price-display/constructor-price-display';

import type { TFilling } from '@/services/slices/constructor-slice';
import type { RootState } from '@/services/store';
import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const bun = useSelector<RootState, TIngredient | null>(
    ({ burgerConstructor }) => burgerConstructor.bun
  );
  const fillings = useSelector<RootState, TFilling[]>(
    ({ burgerConstructor }) => burgerConstructor.items
  );

  const total =
    fillings.reduce((acc, ingredient) => acc + ingredient.price, 0) +
    (bun ? bun.price * 2 : 0);

  const handleOpenModal = (): void => {
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOrderModalOpen(false);
  };

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
        <ConstructorOrderButton onOpen={handleOpenModal} />
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
