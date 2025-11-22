import { postOrder, reset } from '@/services/slices/order-slice';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/services/store';
import type { TFilling, TIngredient } from '@utils/types';

type TUseConstructorLogicReturn = {
  bun: TIngredient | null;
  fillings: TFilling[];
  total: number;
  isOrderModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const useConstructorLogic = (): TUseConstructorLogicReturn => {
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

  return {
    bun,
    fillings,
    total,
    isOrderModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
