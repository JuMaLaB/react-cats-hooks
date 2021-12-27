import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  const {
    catsArray,
    excludedCats,
    addCatHandler,
    findCatById,
  } = useCatsDataManager();

  const provider = {
    catsArray,
    excludedCats,
    addCatHandler,
    findCatById,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};