import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { applyMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
})

export default store;