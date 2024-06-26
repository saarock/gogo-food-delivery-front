import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserFromAppWrite } from "../types/user";

export interface AuthState {
  status: boolean;
  userData: UserFromAppWrite | null;
}

const initialState: AuthState = {
  status: false,
  userData: {
    $id: '',
    $createdAt: '',
    $updatedAt: '',
    accessedAt: '',
    email: '',
    emailVerification: false,
    labels: [],
    mfa: false,
    name: '',
    passwordUpdate: '',
    phone: '',
    phoneVerification: false,
    prefs: {},
    registration: '',
    status: false,
    targets: [],
  },
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserFromAppWrite | null>) => {
      if (!action.payload) return;
      if (!state.userData) return;
      state.status = true;
      state.userData = action.payload

    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
