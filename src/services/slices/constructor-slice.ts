import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TIngredient } from '@/utils/types';

export type TFilling = TIngredient & { uuid: string };

export type TConstructorState = {
  bun: TIngredient | null;
  items: TFilling[];
};

const initialState: TConstructorState = {
  bun: null,
  items: [],
};

const constructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addFilling(state, action: PayloadAction<TIngredient>) {
      state.items.push({ ...action.payload, uuid: uuidv4() });
    },
    removeFilling(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const { setBun, addFilling, removeFilling } = constructorSlice.actions;
export default constructorSlice.reducer;
