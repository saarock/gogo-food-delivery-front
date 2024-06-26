import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../types/foot";
import localStore from "../utils/localStore";
import { PRODUCT_STORE_NAME } from "../constant";

const initialState: Food[] = [];
export const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addFoods: (state, action:PayloadAction<Food>) => {
      state.forEach((eachItem) => {
        if (eachItem.id === action.payload.id && eachItem.quantity === action.payload.quantity && eachItem.resturant.toLowerCase() === action.payload.resturant.toLowerCase()) {
          throw new Error("Items has been already added");
        }
      })

      localStore.stores(PRODUCT_STORE_NAME, action.payload);
      state.push(action.payload);
    },
    addFoodsWitoutLocalStore : (state,action) => {
      state.push(action.payload);
    },
    deleteFood: (state, action:PayloadAction<number>) => {
      return state.filter((currentFood) => currentFood.id !== action.payload);
    },
    deleteFoods : (state) => {
      state.length = 0;

    }
  },
});

export const { addFoods, addFoodsWitoutLocalStore,  deleteFood ,deleteFoods} = productSlice.actions;
export default productSlice.reducer;
