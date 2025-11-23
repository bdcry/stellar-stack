import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import constructorReducer from './slices/constructor-slice';
import currentIngredientReducer from './slices/currentIngredient-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';

import type { TypedUseSelectorHook } from 'react-redux';

const storeSetup = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    orderInfo: orderReducer,
  },
});

export default storeSetup;

export type RootState = ReturnType<typeof storeSetup.getState>;
export type AppDispatch = typeof storeSetup.dispatch;

export const useAppDispatch: () => AppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
