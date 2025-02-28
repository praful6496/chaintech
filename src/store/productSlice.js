import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('/api/products'); 
    return response.json();
});

const initialState = {
    products: JSON.parse(localStorage.getItem('products')) || [], 
    loading: false,
    error: null,
};
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: JSON.parse(localStorage.getItem('products')) || [],
        loading: false,
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        editProduct: (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
                localStorage.setItem('products', JSON.stringify(state.products));
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
    },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
