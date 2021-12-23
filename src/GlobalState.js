import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  const {
    catsArray,
    addCatHandler,
  } = useCatsDataManager();

  const provider = {
    catsArray,
    addCatHandler,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};