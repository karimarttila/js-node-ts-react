import React from "react";
import Header from "../header";
//import { loginReducer } from "../utils/state";
import type { RootState } from "../utils/store";
import { useSelector, useDispatch } from "react-redux";
//import { decrement, increment } from '../utils/state-reducers';
import { login, logout } from "../utils/login-reducer";

export default function Login() {
  const title = "Login";
  const loginState = useSelector((state: RootState) => state.loginState);
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">{title}</p>
      </div>
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">
          {JSON.stringify(loginState)}
        </p>
      </div>
    </div>
  );
}
