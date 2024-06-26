import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import authSlice from "../features/authSlice";
import loadMoreReducer from "../reducer/loadMore";


export const store = configureStore({
    reducer : {
        auth: authSlice,
        foodProducts: productSlice,
    }
})