import { API_URL } from '@/utils/api';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TState = {
  items: TIngredient[];
  status: 'idle' | 'loading' | 'failed';
  error: SerializedError | null;
};

type TApiResponse = {
  success: boolean;
  data: TIngredient[];
};

const initialState: TState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (): Promise<TIngredient[]> => {
    const response = await fetch(`${API_URL}ingredients`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ingredientsData = (await response.json()) as TApiResponse;
    return ingredientsData.data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default ingredientsSlice.reducer;
