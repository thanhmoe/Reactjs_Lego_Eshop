import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCustomers } from '../../axios/apilocal';


export const userLoginFetch = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            const data = await fetchCustomers(user);
            if (data.success) {
                localStorage.setItem("user_token", data.data.auth_token);
            } else{
                console.log(data.message, 234);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginFetch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLoginFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userLoginFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to login';
            });
    },
});


export const selectLoadingState = state => state.user.status;
export const selectErrorState = state => state.user.error;


export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
