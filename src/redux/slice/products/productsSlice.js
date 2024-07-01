import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchRelatedProducts, fetchProductById, searchProducts, fetchProductsRefactor } from "../../../axios/api";

export const fetchProduct = createAsyncThunk(
    'product/getListProduct',
    async (params) => {
        const response = await fetchProductsRefactor(params);
        console.log('RESPONSE =>', response)
        return response;
        // return { data: response.products, totalItems: response.total_products }; // Adjusted to match the API response
    }
);

export const fetchProductDetail = createAsyncThunk(
    'productList/fetchProductDetail',
    async (productId) => {
        const response = await fetchProductById(productId);
        return response;
    }
);

export const searchProduct = createAsyncThunk(
    'productList/searchProduct',
    async ({ page, limit, sortBy, sortOrder, search_keywords }) => {
        const response = await searchProducts(page, limit, sortBy, sortOrder, search_keywords);
        return { data: response.data, totalItems: response.total_products };
    }
);

export const fetchRelatedProduct = createAsyncThunk(
    'productList/fetchRelatedProduct',
    async ({ page, limit, sortBy, sortOrder, categoryId }) => {
        const response = await fetchRelatedProducts(page, limit, sortBy, sortOrder, categoryId);
        return { data: response.data, totalItems: response.total_products }; // Adjusted to match the API response
    }
);

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        items: [],
        categories: [],
        status: 'idle',
        hasError: null,
        totalItems: 0,
        selectedProduct: null,
        productDetailStatus: 'idle',
        productDetailError: null,
        relatedProducts: [],
        relatedProductsStatus: 'idle',
        relatedProductsError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                console.log('ACTION =>', action)
                state.items = action.payload.products;
                state.categories = action.payload.categories;
                state.totalItems = action.payload.total_products;
                state.status = 'succeeded';
                state.hasError = null;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })

            //product detail
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
            })

            //search product
            .addCase(searchProduct.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.status = 'succeeded';
                state.hasError = null;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })
            //product related
            .addCase(fetchRelatedProduct.pending, (state) => {
                state.relatedProductsStatus = 'loading';
                state.relatedProductsError = null;
            })
            .addCase(fetchRelatedProduct.fulfilled, (state, action) => {
                state.relatedProducts = action.payload;
                state.relatedProductsStatus = 'succeeded';
                state.relatedProductsError = null;
            })
            .addCase(fetchRelatedProduct.rejected, (state, action) => {
                state.relatedProductsError = action.error.message;
                state.relatedProductsStatus = 'failed';
            });
    }
});

export const selectProducts = state => state.productsSlice.items;
export const selectLoadingState = state => state.productsSlice.status;
export const selectErrorState = state => state.productsSlice.hasError;
export const selectTotalItems = state => state.productsSlice.totalItems;
export const selectProductDetail = state => state.productsSlice.selectedProduct;
export const selectProductDetailStatus = state => state.productsSlice.productDetailStatus;
export const selectProductDetailError = state => state.productsSlice.productDetailError;
export const selectRelatedProducts = state => state.productsSlice.relatedProducts;
export const selectRelatedProductsStatus = state => state.productsSlice.relatedProductsStatus;
export const selectRelatedProductsError = state => state.productsSlice.relatedProductsError;

export default productsSlice.reducer;
