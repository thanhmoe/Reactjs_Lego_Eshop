import { combineReducers } from "redux";
import productsSlice from "./slice/products/productsSlice";
import articlesSlice from "./slice/articles/articlesSlice";
import userSlice from "./slice/account/userSlice"
// import productsSlice from "../slice/products/productsSlice";
// import articlesSlice from "../slice/articles/articlesSlice";
// import userSlice from "../slice/account/loginSlice";
const rootReducer = combineReducers({
    productsSlice,
    articleList: articlesSlice,
    user: userSlice
})

export default rootReducer;