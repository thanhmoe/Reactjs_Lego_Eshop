import { combineReducers } from "redux";
import counterSlice from "../features/counter/counterSlice";
import productsSlice from "../features/products/productsSlice";

const rootReducer = combineReducers({
    counter: counterSlice,
    productList: productsSlice
})

export default rootReducer;