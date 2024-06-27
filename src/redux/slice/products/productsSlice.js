import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../../axios/api";

export const fetchProduct = createAsyncThunk(
    'productList/fetchProduct',
    async ({ page, limit }) => {
        const response = await fetchProducts(page, limit);
        return { data: response.data, totalItems: response.total_items }; // Adjusted to match the API response
    }
);

const productsSlice = createSlice({
    name: 'productList',
    initialState: {
        items: [],
        status: 'idle',
        hasError: null,
        totalItems: 0,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.status = 'succeeded';
                state.hasError = null;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            });
    }
});

export const { setCurrentPage } = productsSlice.actions;

export const selectProducts = state => state.productList.items;
export const selectLoadingState = state => state.productList.status;
export const selectErrorState = state => state.productList.hasError;
export const selectTotalItems = state => state.productList.totalItems;

export default productsSlice.reducer;
