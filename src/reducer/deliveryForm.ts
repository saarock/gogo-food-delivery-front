export interface State {
  phoneNumber: string;
  address: string;
  userName: string;
}
export const initialState: State = {
  phoneNumber: "",
  address: "",
  userName: "",
};
export type Action =
  | { type: "SET_PHONE_NUMBER"; payload: string }
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "SET_USER_NAME"; payload: string };

  
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};
