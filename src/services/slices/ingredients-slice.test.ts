import { describe, expect, it } from 'vitest';

import ingredientsReducer, { fetchIngredients } from './ingredients-slice';

import type { TIngredient } from '@/utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    __v: 0,
  },
];

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    const state = ingredientsReducer(undefined, { type: '' });

    expect(state).toEqual({ items: [], status: 'idle', error: null });
  });

  it('should handle fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('requestId', undefined)
    );

    expect(state.status).toBe('loading');
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, 'request', undefined)
    );

    expect(state.status).toBe('idle');
    expect(state.items).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('Failed to fetch'), 'request', undefined)
    );

    expect(state.status).toBe('failed');
    expect(state.error).not.toBeNull();
  });
});
