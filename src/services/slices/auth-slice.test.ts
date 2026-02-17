import { describe, expect, it } from 'vitest';

import authReducer, {
  checkAuth,
  login,
  register,
  updateUser,
  logout,
} from './auth-slice';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual({
      user: { email: '', name: '' },
      isAuth: false,
      isAuthChecked: false,
      status: 'idle',
      error: null,
    });
  });

  it('should handle checkAuth.pending', () => {
    const state = authReducer(undefined, checkAuth.pending('request', undefined));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle checkAuth.fulfilled with payload', () => {
    const state = authReducer(
      undefined,
      checkAuth.fulfilled(
        {
          success: false,
          accessToken: '',
          refreshToken: '',
          user: { email: 'everydaysosa@mail.ru', name: 'rlly12' },
        },
        'request',
        undefined
      )
    );

    expect(state.status).toBe('idle');
    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual({ email: 'everydaysosa@mail.ru', name: 'rlly12' });
  });

  it('should handle checkAuth.fulfilled without payload', () => {
    const state = authReducer(
      undefined,
      checkAuth.fulfilled(null, 'request', undefined)
    );

    expect(state.status).toBe('idle');
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual({ email: '', name: '' });
  });

  it('should handle checkAuth.rejected', () => {
    const state = authReducer(
      undefined,
      checkAuth.rejected(new Error('Failed to check auth'), 'request', undefined)
    );
    expect(state.status).toBe('failed');
    expect(state.isAuth).toBe(false);
  });

  it('should handle login.pending', () => {
    const state = authReducer(
      undefined,
      login.pending('request', { email: 'test@example.com', password: 'password' })
    );

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const state = authReducer(
      undefined,
      login.fulfilled(
        {
          success: true,
          accessToken: 'token',
          refreshToken: 'refresh',
          user: { email: 'test@example.com', name: 'Test' },
        },
        'request',
        { email: 'test@example.com', password: 'password' }
      )
    );

    expect(state.status).toBe('idle');
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual({ email: 'test@example.com', name: 'Test' });
    expect(state.error).toBeNull();
  });

  it('should handle login.rejected', () => {
    const state = authReducer(
      undefined,
      login.rejected(new Error('Invalid credentials'), 'request', {
        email: 'test@example.com',
        password: 'wrong',
      })
    );

    expect(state.status).toBe('failed');
    expect(state.isAuth).toBe(false);
    expect(state.error).not.toBeNull();
  });

  it('should handle updateUser.pending', () => {
    const state = authReducer(
      undefined,
      updateUser.pending('request', {
        name: 'New',
        email: 'new@mail.ru',
        password: '123',
      })
    );

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.fulfilled', () => {
    const loggedInState = {
      user: { email: 'old@mail.ru', name: 'Old' },
      isAuth: true,
      isAuthChecked: true,
      status: 'loading' as const,
      error: null,
    };

    const state = authReducer(
      loggedInState,
      updateUser.fulfilled(
        { success: true, user: { email: 'new@mail.ru', name: 'New' } },
        'request',
        { name: 'New', email: 'new@mail.ru', password: '123' }
      )
    );

    expect(state.status).toBe('idle');
    expect(state.user).toEqual({ email: 'new@mail.ru', name: 'New' });
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.rejected', () => {
    const state = authReducer(
      undefined,
      updateUser.rejected(new Error('Update failed'), 'request', {
        name: 'New',
        email: 'new@mail.ru',
        password: '123',
      })
    );

    expect(state.status).toBe('failed');
    expect(state.error).not.toBeNull();
  });

  it('should handle register.pending', () => {
    const state = authReducer(
      undefined,
      register.pending('request', {
        name: 'Tim',
        email: 'tim@mail.ru',
        password: '123',
      })
    );

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle register.fulfilled', () => {
    const state = authReducer(
      undefined,
      register.fulfilled(
        {
          success: true,
          accessToken: 'token',
          refreshToken: 'refresh',
          user: { email: 'tim@mail.ru', name: 'Tim' },
        },
        'request',
        { name: 'Tim', email: 'tim@mail.ru', password: '123' }
      )
    );

    expect(state.status).toBe('idle');
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual({ email: 'tim@mail.ru', name: 'Tim' });
    expect(state.error).toBeNull();
  });

  it('should handle register.rejected', () => {
    const state = authReducer(
      undefined,
      register.rejected(new Error('User already exists'), 'request', {
        name: 'Tim',
        email: 'tim@mail.ru',
        password: '123',
      })
    );

    expect(state.status).toBe('failed');
    expect(state.isAuth).toBe(false);
    expect(state.error).not.toBeNull();
  });

  it('should handle logout.pending', () => {
    const state = authReducer(undefined, logout.pending('request', undefined));

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle logout.fulfilled', () => {
    const loggedInState = {
      user: { email: 'test@mail.ru', name: 'Test' },
      isAuth: true,
      isAuthChecked: true,
      status: 'loading' as const,
      error: null,
    };

    const state = authReducer(
      loggedInState,
      logout.fulfilled(null, 'request', undefined)
    );

    expect(state.status).toBe('idle');
    expect(state.isAuth).toBe(false);
    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.error).toBeNull();
  });

  it('should handle logout.rejected', () => {
    const state = authReducer(
      undefined,
      logout.rejected(new Error('Logout failed'), 'request', undefined)
    );

    expect(state.status).toBe('failed');
    expect(state.error).not.toBeNull();
  });
});
