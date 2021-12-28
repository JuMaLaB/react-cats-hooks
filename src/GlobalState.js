import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  const {
    isLoading,
    catsArray,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    findCatById,
  } = useCatsDataManager();

  const provider = {
    isLoading,
    catsArray,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    findCatById,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};