import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import storeReducer from '../features/store/storeSlice';
import tableReducer from '../features/table/tableSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    store: storeReducer,
    table: tableReducer
  },
});
