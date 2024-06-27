import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../../axios/api";

export const fetchProduct = createAsyncThunk(
    'productList/fetchProduct',
    async ({ page, limit }) => {
        const response = await fetchProducts(page, limit);
        return { data: response.data, totalItems: response.total_products }; // Adjusted to match the API response
    }
);

export const fetchProductDetail = createAsyncThunk(
    'productList/fetchProductDetail',
    async (productId) => {
        const response = await fetchProductById(productId);
        return response;
    }
);

const productsSlice = createSlice({
    name: 'productList',
    initialState: {
        items: [],
        status: 'idle',
        hasError: null,
        totalItems: 0,
        selectedProduct: null,
        productDetailStatus: 'idle',
        productDetailError: null
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
            })
            // 
            .addCase(fetchProductDetail.pending, (state) => {
                state.productDetailStatus = 'loading';
                state.productDetailError = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.productDetailStatus = 'succeeded';
                state.productDetailError = null;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.productDetailError = action.error.message;
                state.productDetailStatus = 'failed';
            });
    }
});

export const { setCurrentPage } = productsSlice.actions;

export const selectProducts = state => state.productList.items;
export const selectLoadingState = state => state.productList.status;
export const selectErrorState = state => state.productList.hasError;
export const selectTotalItems = state => state.productList.totalItems;
export const selectProductDetail = state => state.productList.selectedProduct;
export const selectProductDetailStatus = state => state.productList.productDetailStatus;
export const selectProductDetailError = state => state.productList.productDetailError;

export default productsSlice.reducer;
