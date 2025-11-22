import { postOrderToApi } from '@/utils/api';
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

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (ingredientsIds: string[]): Promise<number> => {
    const data = await postOrderToApi(ingredientsIds);
    return data;
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
