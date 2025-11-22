import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TCurrentIngredientState = {
  current: TIngredient | null;
};

const initialState: TCurrentIngredientState = {
  current: null,
};

const currentIngredientSlice = createSlice({
  name: 'current-ingredient',
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<TIngredient>) {
      state.current = action.payload;
    },
    clearCurrentIngredient(state) {
      state.current = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
