import { configureStore } from '@reduxjs/toolkit';
import StoreReducer from './store-slice';

export const store = configureStore({
    reducer: StoreReducer
});