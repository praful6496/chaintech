// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Assuming you have a productSlice

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
