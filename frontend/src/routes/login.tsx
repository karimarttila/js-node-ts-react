import React, { useCallback } from "react";
import Header from "../header";
import type { RootState } from "../utils/store";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectLoginStatus } from "../utils/login-reducer";

export default function Login() {
  const title = "You need to login to use the web store";
  const loginState = selectLoginStatus(
    useSelector((state: RootState) => state),
  );
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
      alert("TODO: Here call backend, then save token, etc.");
    },
    [dispatch],
  );

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">{title}</p>
      </div>
      <div className="flex grow justify-center items-center">
        <div className="flex grow w-1/2 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2 items-center mt-1">
                <label htmlFor="username" className="login-label">
                  Username
                </label>
                <div className="">
                  <input
                    type="text"
                    id="username"
                    className="login-input"
                    placeholder="username"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 items-center mt-1">
                <label htmlFor="pasword" className="login-label">
                  Password
                </label>
                <div className="">
                  <input
                    type="text"
                    id="password"
                    className="login-input"
                    placeholder="password"
                    required
                  />
                </div>
              </div>
            </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <button className="w-32">Login</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
