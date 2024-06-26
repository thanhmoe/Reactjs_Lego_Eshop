import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMockProducts } from "../../../axios/api";

export const fetchMockProduct = createAsyncThunk(
    'productMockList/fetchMockProduct',
    async () => {
        const data = await fetchMockProducts();
        return data;
    });


const productsMockSlice = createSlice({
    name: 'productMockList',
    initialState: {
        items: [],
        status: 'idle',
        hasError: null
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchMockProduct.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(fetchMockProduct.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
                state.hasError = null

            })
            .addCase(fetchMockProduct.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })
    }
});
export const selectProducts = state => state.productMockList.items;
export const selectLoadingState = state => state.productMockList.status;
export const selectErrorState = state => state.productMockList.hasError;

export default productsMockSlice.reducer;