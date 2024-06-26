import React, { useCallback, useReducer, useState } from "react";
import { Loader, Login } from "../../components";
import { initialState, loginReducer } from "../../reducer/login";
import { toast } from "react-toastify";
import { appWriteService } from "../../service";
import { useDispatch } from "react-redux";
import { login as clientLogin } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const clientAuthDispatch = useDispatch();
  const navigate = useNavigate();
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_EMAIL", payload: e.target.value });
    },
    [state]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_PASSWORD", payload: e.target.value });
    },
    [state]
  );
  const login = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      setLoading(true);
      try {
        e.preventDefault();
        if (!state.email) {
          toast.warn("Email is requried");
          return;
        }
        if (!state.password) {
          toast.warn("Password is required");
          return;
        }
        await appWriteService.login(state.email, state.password);
        const userDetails = await appWriteService.getCurrentUser();
        clientAuthDispatch(clientLogin(userDetails));
        navigate("/dash");
        // window.location.assign("/dash");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Login Failed");
      } finally {
        setLoading(false);
      }
    },
    [state]
  );

  if (loading) return <Loader />;
  return (
    <Login
      login={login}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      emailText={state.email}
      passwordText={state.password}
    />
  );
};

export default LoginPage;
