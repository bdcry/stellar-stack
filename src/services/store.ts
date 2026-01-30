import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { socketMiddleware } from './middleware/socket-middleware';
import authReducer from './slices/auth-slice';
import constructorReducer from './slices/constructor-slice';
import currentIngredientReducer from './slices/currentIngredient-slice';
import feedReducer, { feedActions } from './slices/feed-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import { feedWsConnect, feedWsDisconnect } from './ws-actions/actions';

import type { TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  orderInfo: orderReducer,
  auth: authReducer,
  feed: feedReducer,
});

const feedsWsMiddleware = socketMiddleware({
  connect: feedWsConnect,
  disconnect: feedWsDisconnect,
  onOpen: feedActions.wsOpen,
  onClose: feedActions.wsClose,
  onError: feedActions.wsError,
  onMessage: feedActions.wsMessage,
});

const storeSetup = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedsWsMiddleware),
});

export default storeSetup;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof storeSetup.dispatch;

export const useAppDispatch: () => AppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
