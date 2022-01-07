import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  // console.log(`GlobalProvider => `);

  const {
    isLoading,
    catsArray,
    breedsArray,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    deleteCatsHandler,
    findCatById,
  } = useCatsDataManager();

  const provider = {
    isLoading,
    catsArray,
    breedsArray,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    deleteCatsHandler,
    findCatById,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};