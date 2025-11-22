import { postOrder, reset } from '@/services/slices/order-slice';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFillings from './constructor-fillings/constructor-fillings';
import ConstructorOrderButton from './constructor-order-button/constructor-order-button';
import ConstructorPriceDisplay from './constructor-price-display/constructor-price-display';

import type { TFilling } from '@/services/slices/constructor-slice';
import type { AppDispatch, RootState } from '@/services/store';
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

  const dispatch = useDispatch<AppDispatch>();

  const total = useMemo((): number => {
    const fillingsTotal = fillings.reduce((acc, item) => acc + item.price, 0);
    const bunTotal = bun ? bun.price * 2 : 0;
    return fillingsTotal + bunTotal;
  }, [fillings, bun]);

  const handleOpenModal = (): void => {
    if (!bun || fillings.length === 0) return;
    const ids = [bun._id, ...fillings.map((item) => item._id), bun._id];
    void dispatch(postOrder(ids));
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOrderModalOpen(false);
    dispatch(reset());
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
        <ConstructorOrderButton
          onOpen={handleOpenModal}
          disabled={!bun || fillings.length === 0}
        />
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
