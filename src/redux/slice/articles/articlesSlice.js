import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchArticles, fetchNewsById } from "../../../services/news_service";

export const fetchArticle = createAsyncThunk(
    'articleList/fetchArticle',
    async () => {
        const res = await fetchArticles();
        return res.news;
    });

export const fetchNewsDetail = createAsyncThunk(
    'fetchArticleDetail',
    async (id) => {
        const res = await fetchNewsById(id);
        return res;
    });

const articleSlice = createSlice({
    name: 'articleList',
    initialState: {
        items: [],
        status: 'ide',
        hasError: null,
        selectedNews: null,
        newsDetailStatus: 'idle',
        newsDetailError: null,
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
            //news detail
            .addCase(fetchNewsDetail.pending, (state) => {
                state.newsDetailStatus = 'loading';
                state.newsDetailError = null;
            })
            .addCase(fetchNewsDetail.fulfilled, (state, action) => {
                state.selectedNews = action.payload;
                state.newsDetailStatus = 'succeeded';
                state.newsDetailError = null;
            })
            .addCase(fetchNewsDetail.rejected, (state, action) => {
                state.newsDetailError = action.error.message;
                state.newsDetailStatus = 'failed';
            })
    }
});
export const selectArticles = state => state.articleList.items;
export const selectLoadingState = state => state.articleList.status;
export const selectNewDetail = state => state.articleList.selectedNews;
export const selectErrorState = state => state.articleList.hasError;

export default articleSlice.reducer;