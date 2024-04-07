"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ErrorAlert from "../alerts/errorAlert";
import useSuccessMsg from "../lib/useSuccessMsg";
import SuccessAlert from "../alerts/successAlert";
import { handleCategoryClick } from "../lib/utils";
import { useData } from "../context";
import CartIcon from "./CartIcon";
import SearchIcon from "./SearchIcon";
import useLocalStorage from "../lib/useLocalStorage";

export const Navbar = (props: any) => {
  const router = useRouter();
  const { store, setData } = useData();
  const { loginRes, successMsg, errorMsg } = store;
  const isSuccessAlertAlive = useSuccessMsg();
  const [isErrorAlertActive, setIsErrorAlertActive] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorage("userInfo")


  useEffect(() => {
    if (errorMsg) {
      setIsErrorAlertActive(true);
      const timeout = setTimeout(() => {
        setIsErrorAlertActive(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [errorMsg]);
  return (
    <nav className="h-100 w-full px-10 py-2 fixed top-0 z-100 flex flex-col justify-between bg-white">
      {isSuccessAlertAlive && <SuccessAlert message={successMsg} />}
      {isErrorAlertActive && <ErrorAlert message={errorMsg} />}
      <div className="flex justify-end gap-4 h-9 items-center">
        <p className=" text-xs font-normal leading-4 text-left">Help</p>
        <p className=" text-xs font-normal leading-4 text-left">
          Orders & Returns
        </p>
        <p className=" text-xs font-normal leading-4 text-left">
          Hi, {store?.userInfo?.name || ""}
        </p>
        {userInfo?.token ? (
          <button
            className="text-xs font-normal leading-4 text-left"
            onClick={() => {
              window.localStorage.clear();
              setData({
                successMsg: "Logged out successfully",
              });
              router.push("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-xs font-normal leading-4 text-left"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-32 font-bold leading-39 text-left">ECOMMERCE</p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <p
              onClick={() => handleCategoryClick(userInfo?.token, router)}
              className="text-base font-semibold leading-5 text-left cursor-pointer"
            >
              Categories
            </p>
            <p className="text-base font-semibold leading-5 text-left">Sale</p>
            <p className="text-base font-semibold leading-5 text-left">
              Clearance
            </p>
            <p className="text-base font-semibold leading-5 text-left">
              New Stock
            </p>
            <p className="text-base font-semibold leading-5 text-left">
              Trending
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <CartIcon />
          <SearchIcon />
        </div>
      </div>
    </nav>
  );
};
