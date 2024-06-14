import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "../../axios/api";

export const fetchArticle = createAsyncThunk(
    'articleList/fetchArticle',
    async () => {
        const data = await fetchArticles();
        return data;
    });

const articleSlice = createSlice({
    name: 'articleList',
    initialState: {
        items: [],
        status: 'ide',
        hasError: null
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchArticle.pending, (state) => {
                state.status = 'loading';
                state.hasError = null;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
                state.hasError = null

            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.hasError = action.error.message;
                state.status = 'failed';
            })
    }
});
export const selectArticles = state => state.articleList.items;
export const selectLoadingState = state => state.articleList.status;
export const selectErrorState = state => state.articleList.hasError;
export default articleSlice.reducer;