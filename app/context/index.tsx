"use client";
import React, { createContext, useContext, useState } from "react";

type Data = any;
const initalState = {
  currentPage: 1,
  loginRes: {},
  userInfo: {},
  isSuccessAlertAlive: false,
  isErrorAlertActive: false,
};
const DataContext = createContext<{
  store: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}>({
  store: initalState,
  setData: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setData] = useState<Data>(initalState);

  return (
    <DataContext.Provider value={{ store, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
