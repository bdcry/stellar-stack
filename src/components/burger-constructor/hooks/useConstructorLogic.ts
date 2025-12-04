import {
  addFilling,
  clearConstructor,
  setBun,
} from '@/services/slices/constructor-slice';
import { postOrder, reset } from '@/services/slices/order-slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';

import type { TFilling, TIngredient } from '@utils/types';

type TUseConstructorLogicReturn = {
  bun: TIngredient | null;
  fillings: TFilling[];
  total: number;
  isOrderModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  dropRefTopBun: ReturnType<typeof useDrop>[1];
  isHoverBunTop: boolean;
  dropRefBottomBun: ReturnType<typeof useDrop>[1];
  isHoverBunBottom: boolean;
  dropRefFillings: ReturnType<typeof useDrop>[1];
  isHoverFilling: boolean;
};

export const useConstructorLogic = (): TUseConstructorLogicReturn => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const bun = useAppSelector(({ burgerConstructor }) => burgerConstructor.bun);
  const fillings = useAppSelector(({ burgerConstructor }) => burgerConstructor.items);
  const allIngredients = useAppSelector(({ ingredients }) => ingredients.items);

  const dispatch = useAppDispatch();

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
    dispatch(clearConstructor());
  };

  const [{ isHoverBunTop }, dropRefTopBun] = useDrop({
    accept: 'ingredient',
    canDrop: (item) => item.type === 'bun',
    drop: (item: { _id: string; type: string }) => {
      const ingredient = allIngredients.find((ing) => ing._id === item._id);

      if (ingredient && ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      }
    },
    collect: (monitor) => ({
      isHoverBunTop: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const [{ isHoverBunBottom }, dropRefBottomBun] = useDrop({
    accept: 'ingredient',
    canDrop: (item) => item.type === 'bun',
    drop: (item: { _id: string; type: string }) => {
      const ingredient = allIngredients.find((ing) => ing._id === item._id);

      if (ingredient && ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      }
    },
    collect: (monitor) => ({
      isHoverBunBottom: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const [{ isHoverFilling }, dropRefFillings] = useDrop({
    accept: 'ingredient',
    canDrop: (item) => {
      return item.type !== 'bun';
    },
    drop: (item: { _id: string; type: string }) => {
      const ingredient = allIngredients.find((ing) => ing._id === item._id);

      if (ingredient && ingredient.type !== 'bun') {
        dispatch(addFilling(ingredient));
      }
    },

    collect: (monitor) => ({
      isHoverFilling: monitor.isOver() && monitor.canDrop(),
    }),
  });

  return {
    bun,
    fillings,
    total,
    isOrderModalOpen,
    handleOpenModal,
    handleCloseModal,
    dropRefTopBun,
    isHoverBunTop,
    dropRefBottomBun,
    isHoverBunBottom,
    dropRefFillings,
    isHoverFilling,
  };
};
