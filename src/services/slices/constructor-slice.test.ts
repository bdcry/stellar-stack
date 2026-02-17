import { describe, expect, it, vi } from 'vitest';

import constructorReducer, {
  addFilling,
  clearConstructor,
  moveFilling,
  removeFilling,
  setBun,
} from './constructor-slice';

import type { TIngredient } from '@/utils/types';

const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const filling: TIngredient = {
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
};

const fillings: TIngredient[] = [
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

vi.mock('uuid', () => ({
  v4: (): string => 'test-uuid',
}));

describe('constructorSlice', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual({
      bun: null,
      items: [],
    });
  });

  it('should handle setBun', () => {
    const state = constructorReducer(undefined, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('should handle addFilling with uuid', () => {
    const state = constructorReducer({ bun: null, items: [] }, addFilling(filling));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].uuid).toBe('test-uuid');
    expect(state.items[0].name).toBe(filling.name);
  });

  it('should handle removeFilling by uuid', () => {
    const state = constructorReducer(
      { bun: null, items: [{ ...filling, uuid: 'test-uuid' }] },
      removeFilling('test-uuid')
    );

    expect(state.items).toHaveLength(0);
  });

  it('should handle moveFilling', () => {
    const state = constructorReducer(
      {
        bun: null,
        items: fillings.map((item) => {
          return { ...item, uuid: `uuid-${item._id}` };
        }),
      },
      moveFilling({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.items[0].name).toBe(fillings[1].name);
    expect(state.items[1].name).toBe(fillings[0].name);
  });

  it('should handle clearConstructor', () => {
    const state = constructorReducer(
      { bun, items: fillings.map((item) => ({ ...item, uuid: `uuid-${item._id}` })) },
      clearConstructor()
    );

    expect(state).toEqual({ bun: null, items: [] });
  });
});
