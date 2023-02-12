import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectLoginStatus, selectUser } from "./utils/login-reducer";
import { RootState } from "./utils/store";

const Header = function () {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginState = selectLoginStatus(
    useSelector((state: RootState) => state),
  );
  const user = selectUser(useSelector((state: RootState) => state));

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };


  return (
    <div className="flex grow bg-gray-200 p-4">
      <div className="flex flex-col grow">
        <div className="flex justify-end">
          {loginState === "loggedIn" && user && (
            <div className="flex justify-right gap-2">
              <p className="">{user}</p>
              <a href="#" onClick={handleLogout} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Logout</a>
            </div>
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
