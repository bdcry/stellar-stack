import { useAppSelector } from '@/services/store';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { TIngredient } from '@utils/types';

type TUseIngredientsLogicReturn = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  bunSectionRef: React.RefObject<HTMLDivElement | null>;
  sauceSectionRef: React.RefObject<HTMLDivElement | null>;
  mainSectionRef: React.RefObject<HTMLDivElement | null>;
  isActiveTab: string;
  groups: {
    bun: TIngredient[];
    main: TIngredient[];
    sauce: TIngredient[];
  };
  getCount: (id: string) => number;
  handleTabClick: (tabName: string) => void;
};

export const useIngredientsLogic = (
  ingredients: TIngredient[]
): TUseIngredientsLogicReturn => {
  const [isActiveTab, setIsActiveTab] = useState('bun');
  const containerRef = useRef<HTMLDivElement>(null);

  const bunSectionRef = useRef<HTMLDivElement>(null);
  const sauceSectionRef = useRef<HTMLDivElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  const burgerConstructorData = useAppSelector(
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

    const bunRect = bunSectionRef.current?.getBoundingClientRect();
    const sauceRect = sauceSectionRef.current?.getBoundingClientRect();
    const mainRect = mainSectionRef.current?.getBoundingClientRect();

    if (!bunRect || !sauceRect || !mainRect) return;

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

  return {
    containerRef,
    bunSectionRef,
    sauceSectionRef,
    mainSectionRef,
    isActiveTab,
    groups,
    getCount,
    handleTabClick,
  };
};
