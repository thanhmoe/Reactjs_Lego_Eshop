import { combineReducers } from "redux";
import productsSlice from "../features/products/productsSlice";
import articlesSlice from "../features/articles/articlesSlice";
import userSlice from "../features/account/loginSlice";
const rootReducer = combineReducers({
    productList: productsSlice,
    articleList: articlesSlice,
    user: userSlice
})

export default rootReducer;