import { requestNewToken } from '@/utils/api';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

type TAuthState = {
  isAuth: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: SerializedError | null;
};

const initialState: TAuthState = {
  isAuth: false,
  status: 'idle',
  error: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return null;
  }

  const newAccessToken = await requestNewToken(refreshToken);
  localStorage.setItem('accessToken', newAccessToken.accessToken);
  localStorage.setItem('refreshToken', newAccessToken.refreshToken);

  return newAccessToken;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
