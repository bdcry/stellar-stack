import {
  getUserData,
  logoutRequest,
  refreshAccessToken,
  signIn,
  signUp,
  updateUserData,
} from '@/utils/api';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

import type { TLoginData, TRegisterData, TUpdateUserData } from '@/utils/types';

type TAuthState = {
  user: {
    email: string;
    name: string;
  };
  isAuth: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: SerializedError | null;
};

const initialState: TAuthState = {
  user: { email: '', name: '' },
  isAuth: false,
  status: 'idle',
  error: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return null;
  }

  const newAccessToken = await refreshAccessToken(refreshToken);
  localStorage.setItem('accessToken', newAccessToken.accessToken);
  localStorage.setItem('refreshToken', newAccessToken.refreshToken);

  const userData = await getUserData(newAccessToken.accessToken);

  return { ...newAccessToken, user: userData.user };
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const response = await signIn(email, password);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterData) => {
    const response = await signUp(email, password, name);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ name, email, password }: TUpdateUserData) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return null;
    }

    const response = await updateUserData(token, name, email, password);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return null;
  }
  const response = await logoutRequest(refreshToken);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload.user;
        }
        state.status = 'idle';
        state.isAuth = payload !== null;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.error = action.error;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.isAuth = payload.success;
        state.error = null;
        state.user = { email: payload.user.email, name: payload.user.name };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.error = action.error;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.isAuth = payload.success;
        state.error = null;
        state.user = {
          email: payload.user.email,
          name: payload.user.name,
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.error = action.error;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = 'idle';
          state.error = null;
          state.user = {
            email: payload.user.email,
            name: payload.user.name,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuth = false;
        state.user = { email: '', name: '' };
        state.error = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
