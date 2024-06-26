export interface LoginState {
  email: string;
  password: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
};

export type LoginAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET" };

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export { initialState, loginReducer };
