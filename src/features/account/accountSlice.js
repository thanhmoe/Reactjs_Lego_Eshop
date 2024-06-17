import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "../../axios/api";
import { fetchCustomers } from "../../axios/apilocal";

export const fetchCustomer = createAsyncThunk(
    'articleList/fetchArticle',
    async () => {
        const data = await fetchCustomers();
        return data;
    });

const customerSlice = createSlice({
    name: 'customerData',
    initialState: {
        items: [],
        status: 'ide',
        hasError: null
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchCustomer.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(fetchCustomer.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
                state.hasError = null

            })
            .addCase(fetchCustomer.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })
    }
});
export const selectCustomer = state => state.customerData.items;
export const selectLoadingState = state => state.customerData.status;
export const selectErrorState = state => state.customerData.hasError;
export default customerSlice.reducer;