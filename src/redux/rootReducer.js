import { combineReducers } from "redux";
import productsSlice from "../features/products/productsSlice";
import articlesSlice from "../features/articles/articlesSlice";

const rootReducer = combineReducers({
    productList: productsSlice,
    articleList: articlesSlice
})

export default rootReducer;