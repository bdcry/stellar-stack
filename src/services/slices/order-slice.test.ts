import { describe, expect, it } from 'vitest';

import orderReducer, { postOrder, reset } from './order-slice';

type TMockState = {
  orderNumber: number | null;
  status: 'idle' | 'loading' | 'failed';
  error: null;
};

const mockState: TMockState = {
  orderNumber: 123,
  status: 'idle',
  error: null,
};

describe('orderSlice', () => {
  it('should return the initial state', () => {
    const state = orderReducer(undefined, { type: '' });
    expect(state).toEqual({
      orderNumber: null,
      status: 'idle',
      error: null,
    });
  });

  it('should handle reset', () => {
    const state = orderReducer(mockState, reset());

    expect(state).toEqual({
      orderNumber: null,
      status: 'idle',
      error: null,
    });
  });

  it('should handle postOrder.pending', () => {
    const state = orderReducer(undefined, postOrder.pending('request', ['id1', 'id2']));

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle postOrder.fulfilled', () => {
    const state = orderReducer(
      undefined,
      postOrder.fulfilled(123, 'request', ['id1', 'id2'])
    );

    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
    expect(state.orderNumber).toBe(123);
  });

  it('should handle postOrder.rejected', () => {
    const state = orderReducer(
      undefined,
      postOrder.rejected(new Error('Failed to post order'), 'request', ['id1', 'id2'])
    );

    expect(state.status).toBe('failed');
    expect(state.error).not.toBeNull();
  });
});
