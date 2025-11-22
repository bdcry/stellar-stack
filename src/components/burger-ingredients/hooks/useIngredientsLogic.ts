import {
  addFilling,
  setBun,
  type TConstructorState,
} from '@/services/slices/constructor-slice';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '@/services/slices/currentIngredient-slice';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/services/store';
import type { TIngredient } from '@utils/types';

type TUseIngredientsLogicReturn = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActiveTab: string;
  groups: {
    bun: TIngredient[];
    main: TIngredient[];
    sauce: TIngredient[];
  };
  getCount: (id: string) => number;
  handleTabClick: (tabName: string) => void;
  handleSelectIngredient: (ingredient: TIngredient) => void;
  handleCloseModal: () => void;
};

export const useIngredientsLogic = (
  ingredients: TIngredient[]
): TUseIngredientsLogicReturn => {
  const [isActiveTab, setIsActiveTab] = useState('bun');
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const burgerConstructorData = useSelector<RootState, TConstructorState>(
    ({ burgerConstructor }) => burgerConstructor
  );

  const groups = useMemo(
    () => ({
      bun: ingredients.filter((item) => item.type === 'bun'),
      main: ingredients.filter((item) => item.type === 'main'),
      sauce: ingredients.filter((item) => item.type === 'sauce'),
    }),
    [ingredients]
  );

  const getCount = (id: string): number => {
    return (
      (burgerConstructorData.bun?._id === id ? 2 : 0) +
      burgerConstructorData.items.filter((item) => item._id === id).length
    );
  };

  const handleTabClick = (tabName: string): void => {
    setIsActiveTab(tabName);
    const element = document.getElementById(tabName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = (): void => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const bunSection = document.getElementById('bun');
    const sauceSection = document.getElementById('sauce');
    const mainSection = document.getElementById('main');

    if (!bunSection || !sauceSection || !mainSection) return;

    const bunRect = bunSection.getBoundingClientRect();
    const sauceRect = sauceSection.getBoundingClientRect();
    const mainRect = mainSection.getBoundingClientRect();

    const bunDistance = Math.abs(bunRect.top - containerRect.top);
    const sauceDistance = Math.abs(sauceRect.top - containerRect.top);
    const mainDistance = Math.abs(mainRect.top - containerRect.top);

    const activeTab =
      bunDistance < sauceDistance && bunDistance < mainDistance
        ? 'bun'
        : sauceDistance < mainDistance
          ? 'sauce'
          : 'main';

    setIsActiveTab(activeTab);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return (): void => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSelectIngredient = (ingredient: TIngredient): void => {
    dispatch(setCurrentIngredient(ingredient));

    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addFilling(ingredient));
    }
  };

  const handleCloseModal = (): void => {
    dispatch(clearCurrentIngredient());
  };

  return {
    containerRef,
    isActiveTab,
    groups,
    getCount,
    handleTabClick,
    handleSelectIngredient,
    handleCloseModal,
  };
};
