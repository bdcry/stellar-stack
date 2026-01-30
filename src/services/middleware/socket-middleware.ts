import type { RootState } from '../store';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TWsActionTypes<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

export const socketMiddleware = <R, S>(
  wsActions: TWsActionTypes<R, S>
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    const { connect, disconnect, onConnecting, onOpen, onClose, onError, onMessage } =
      wsActions;

    const { dispatch } = store;
    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = (): void => {
          onError && dispatch(onError('WebSocket error'));
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());
        };

        socket.onmessage = (event: MessageEvent<string>): void => {
          try {
            const data = JSON.parse(event.data) as R;
            dispatch(onMessage(data));
          } catch (e) {
            dispatch(onError((e as Error).message));
          }
        };
      }

      if (disconnect.match(action)) {
        if (socket) {
          socket.close();
          socket = null;
        }
      }

      return next(action);
    };
  };
};
