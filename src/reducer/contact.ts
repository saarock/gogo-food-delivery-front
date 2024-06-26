import { Any } from "../types/all";

export const initialState: Any = {
  name: "",
  email: "",
  message: "",
};

export type Action =
  | { type: "NAME"; payload: string }
  | { type: "EMAIL"; payload: string }
  | { type: "MESSAGE"; payload: string }
  |{type: "RESET"}

export const contactFormRedcer = (state: Any, action: Action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "MESSAGE":
      return { ...state, message: action.payload };
    case "RESET":
        return initialState;

    default:
      return state;
  }
};
