import { combineReducers } from "redux";
import productsSlice from "./slice/products/productsSlice";
import articlesSlice from "./slice/articles/articlesSlice";
import userSlice from "./slice/account/userSlice"
import cartsSlice from "./slice/carts/cartsSlice";

const rootReducer = combineReducers({
    cartsSlice,
    productsSlice,
    articleList: articlesSlice,
    user: userSlice
})

export default rootReducer;