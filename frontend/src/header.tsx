import React from "react";
import { useSelector } from "react-redux";
import { selectLoginStatus, selectUser } from "./utils/login-reducer";
import { RootState } from "./utils/store";

const Header = function () {
  const loginState = selectLoginStatus(
    useSelector((state: RootState) => state),
  );
  const user = selectUser(useSelector((state: RootState) => state));

  return (
    <div className="flex grow bg-gray-200 p-4">
      <div className="flex flex-col grow">
        <div className="flex justify-end">
          {loginState === "loggedIn" && user && (
            <h1 className="flex justify-right text text-center">{user}</h1>
          )}
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl text-center font-bold">Demo Webstore!</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
