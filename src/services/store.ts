import { configureStore } from '@reduxjs/toolkit';

import constructorReducer from './slices/constructor-slice';
import currentIngredientReducer from './slices/currentIngredient-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';

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
