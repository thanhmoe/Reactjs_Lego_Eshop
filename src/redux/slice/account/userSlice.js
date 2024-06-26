import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCustomers, registerUser } from '../../../axios/api';

export const userLoginFetch = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            const data = await fetchCustomers(user);
            if (data.success) {
                localStorage.setItem("auth_token", data.data.auth_token);
                return data.data;
            } else {
                return thunkAPI.rejectWithValue(data.message);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
);

export const userRegisterFetch = createAsyncThunk(
    'user/register',
    async (newUser, thunkAPI) => {
        try {
            const res = await registerUser(newUser);
            console.log(res,'userslice999')
            return res.response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loginStatus: 'idle',
        loginError: null,
        registerStatus: 'idle',
        registerError: null,
    },
    reducers: {
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("auth_token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(userLoginFetch.pending, (state) => {
                state.loginStatus = 'loading';
            })
            .addCase(userLoginFetch.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userLoginFetch.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.loginError = action.payload || 'Failed to login';
            })
            // Register cases
            .addCase(userRegisterFetch.pending, (state) => {
                state.registerStatus = 'loading';
            })
            .addCase(userRegisterFetch.fulfilled, (state, action) => {
                state.registerStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userRegisterFetch.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.registerError = action.payload || 'Failed to register';
                // state.registerError = action.payload ? action.payload.message : 'Failed to register';
            });
    },
});



export const selectLoginState = state => state.user.loginStatus;
export const selectLoginErrorState = state => state.user.loginError;
export const selectRegisterState = state => state.user.registerStatus;
export const selectRegisterErrorState = state => state.user.registerError;


export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
