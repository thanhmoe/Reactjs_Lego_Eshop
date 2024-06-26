import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../../axios/api";

export const fetchProduct = createAsyncThunk(
    'productList/fetchProduct',
    async () => {
        const data = await fetchProducts();
        console.log(data.data,'sliceeeeeeeeeeeeeeeee');
        return data.data;
    });


const productsSlice = createSlice({
    name: 'productList',
    initialState: {
        items: [],
        status: 'ide',
        hasError: null
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
                state.items = action.payload;
                state.status = 'succeeded';
                state.hasError = null

            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })
    }
});
export const selectProducts = state => state.productList.items;
export const selectLoadingState = state => state.productList.status;
export const selectErrorState = state => state.productList.hasError;

export default productsSlice.reducer;