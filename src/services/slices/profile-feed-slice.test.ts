import { describe, expect, it } from 'vitest';

import profileFeedReducer, { profileFeedActions } from './profile-feed-slice';

import type { TWsFeedsSuccess } from '../ws-types/types';

const mockPayload: TWsFeedsSuccess = {
  success: true,
  orders: [
    {
      _id: '643d69a5c3f7b9001cfa0940',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2026-02-07T18:54:36.120Z',
      updatedAt: '2026-02-07T18:54:36.348Z',
      number: 100538,
    },
  ],
  total: 100538,
  totalToday: 445,
};

describe('profileFeedSlice', () => {
  it('should return the initial state', () => {
    const state = profileFeedReducer(undefined, { type: '' });

    expect(state).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    });
  });

  it('should handle wsOpen', () => {
    const state = profileFeedReducer(undefined, profileFeedActions.wsOpen());

    expect(state.wsConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle wsClose', () => {
    const state = profileFeedReducer(undefined, profileFeedActions.wsClose());

    expect(state.wsConnected).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle wsError', () => {
    const errorMessage = 'WebSocket error';
    const state = profileFeedReducer(
      undefined,
      profileFeedActions.wsError(errorMessage)
    );

    expect(state.wsConnected).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle wsMessage', () => {
    const state = profileFeedReducer(
      undefined,
      profileFeedActions.wsMessage(mockPayload)
    );

    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
  });
});
