import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TFeed, TWsFeedsSuccess } from '../ws-types/types';

type TProfileWsState = {
  wsConnected: boolean;
  orders: TFeed[];
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TProfileWsState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const profileFeedSlice = createSlice({
  name: 'profileWs',
  initialState,
  reducers: {
    wsOpen(state) {
      state.wsConnected = true;
      state.error = null;
    },
    wsClose(state) {
      state.wsConnected = false;
    },
    wsError(state, action: PayloadAction<string>) {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsMessage(state, action: PayloadAction<TWsFeedsSuccess>) {
      const data = action.payload;
      state.orders = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    },
  },
});

export const profileFeedActions = profileFeedSlice.actions;
export default profileFeedSlice.reducer;
