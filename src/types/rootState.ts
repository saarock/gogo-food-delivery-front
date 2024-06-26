import { AuthState } from "../features/authSlice";
import { Food } from "./foot";
import { User } from "./user";

export interface RootState {
    auth:AuthState
    foodProducts: Food[]
}