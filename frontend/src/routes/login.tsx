import React from "react";
import Header from "../header";
import type { RootState } from "../utils/store";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectLoginStatus } from "../utils/login-reducer";

export default function Login() {
  const title = "Login";
  const loginState = selectLoginStatus(useSelector((state: RootState) => state));

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
