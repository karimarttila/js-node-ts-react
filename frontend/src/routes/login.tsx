import React, { useState, useCallback } from "react";
import Header from "../header";
import { useDispatch } from "react-redux";
import { login } from "../utils/login-reducer";
import {
  ErrorMessage,
  LoginResponse,
  loginUrl,
  fetchJSON,
} from "../utils/util";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const title = "You need to login to use the web store";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<{ title: string; msg: string } | null>(
    null,
  );

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
      try {
        const response: LoginResponse = await fetchJSON({
          url: loginUrl,
          method: "post",
          data: { username, password },
        });
        setError(null);
        if (response.ret === "ok" && response.token) {
          dispatch(
            login({
              token: response.token,
              username: username,
            }),
          );
          navigate("/product-groups");
        } else {
          setError({ title: "Login failed!", msg: "Bad response." });
        }
      } catch (error) {
        // NOTE: In real application we should validate if the error is due to wrong username or password,
        // or if the server is down, etc.
        setError({
          title: "Login failed!",
          msg: "Username or password is wrong.",
        });
      }
    },
    [navigate],
  );

  return (
    <>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">{title}</p>
      </div>
      {error && (
        <div className="flex grow w-3/4 p-4">
          <ErrorMessage title={error.title} msg={error.msg} />
        </div>
      )}
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
                <label htmlFor="password" className="login-label">
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
    </>
  );
}
