import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalProductCount } from "../../../services/cart_serviced";

export const getTotalProductInCart = createAsyncThunk(
    'getTotalProductIncart',
    async () => {
        const res = await getTotalProductCount();
        return res.total_items
    }
)

const cartsSlice = createSlice({
    name: 'cartsSlice',
    initialState: {
        totalProduct: 0,
        totalProductStatus: 'ide',
        totalProductError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalProductInCart.pending, (state) => {
                state.totalProductStatus = 'loading';
                state.totalProductError = null;
            })
            .addCase(getTotalProductInCart.fulfilled, (state, action) => {
                state.totalProduct = action.payload;
                state.totalProductStatus = 'succeeded';
                state.totalProductError = null;
            })
            .addCase(getTotalProductInCart.rejected, (state, action) => {
                state.totalProductError = action.error.message;
                state.totalProductStatus = 'failed';
            });
    }
})

export default cartsSlice.reducer;