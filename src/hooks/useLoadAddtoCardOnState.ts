import React, { useEffect } from "react";
import localStore from "../utils/localStore";
import { PRODUCT_STORE_NAME } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addFoods, addFoodsWitoutLocalStore } from "../features/productSlice";
import { RootState } from "../types/rootState";
import { Food } from "../types";

let onlyOneTime = false;
const useLoadAddtoCardOnState = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.foodProducts);

  useEffect(() => {
    if (onlyOneTime) return;
    (() => {
      try {
        const data:Food[] = localStore.gets(PRODUCT_STORE_NAME);
        if (!data) return;
       
        data.forEach((currentData) => {
            dispatch(addFoodsWitoutLocalStore(currentData));
        })
      } catch (error) {}
      finally {
        onlyOneTime = true;
      }
    })();
  }, []);
};

export default useLoadAddtoCardOnState;
