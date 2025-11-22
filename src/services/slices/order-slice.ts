import { API_URL } from '@/utils/api';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

type TOrderState = {
  orderNumber: number | null;
  status: 'idle' | 'loading' | 'failed';
  error: SerializedError | null;
};

const initialState: TOrderState = {
  orderNumber: null,
  status: 'idle',
  error: null,
};

type TApiResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (ingredientsIds: string[]): Promise<number> => {
    const response = await fetch(`${API_URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const orderData = (await response.json()) as TApiResponse;
    return orderData.order.number;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset(state) {
      state.orderNumber = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orderNumber = action.payload;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
