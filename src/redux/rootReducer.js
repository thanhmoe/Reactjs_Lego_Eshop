import { combineReducers } from "redux";
import productsSlice from "../features/products/productsSlice";

const rootReducer = combineReducers({
    productList: productsSlice
})

export default rootReducer;