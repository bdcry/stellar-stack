import { describe, expect, it } from 'vitest';

import currentIngredientReducer, {
  clearCurrentIngredient,
  setCurrentIngredient,
} from './currentIngredient-slice';

import type { TIngredient } from '@/utils/types';

const ingredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
};

describe('currentIngredientSlice', () => {
  it('should return the initial state', () => {
    expect(currentIngredientReducer(undefined, { type: '' })).toEqual({
      current: null,
    });
  });

  it('should handle setCurrentIngredient', () => {
    const state = currentIngredientReducer(
      { current: null },
      setCurrentIngredient(ingredient)
    );

    expect(state.current).toEqual(ingredient);
  });

  it('should handle clearCurrentIngredient', () => {
    const state = currentIngredientReducer(
      { current: ingredient },
      clearCurrentIngredient()
    );

    expect(state.current).toBeNull();
  });
});
