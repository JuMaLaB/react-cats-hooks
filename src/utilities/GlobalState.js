import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  // console.log(`GlobalProvider => `);

  const {
    baseUrl,
    isLoading,
    catsArray,
    breedsArray,
    selectedCats,
    deletedCats,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatsHandler,
    toggleSelectedHandler,
    deleteCatsHandler,
    toggleDeletedHandler,
  } = useCatsDataManager();

  const provider = {
    baseUrl,
    isLoading,
    catsArray,
    breedsArray,
    selectedCats,
    deletedCats,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatsHandler,
    toggleSelectedHandler,
    deleteCatsHandler,
    toggleDeletedHandler,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};