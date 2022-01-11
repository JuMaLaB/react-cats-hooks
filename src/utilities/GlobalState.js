import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  // console.log(`GlobalProvider => `);

  const {
    baseUrl,
    isLoading,
    savedCats,
    selectedCats,
    deletedCats,
    excludedCats,
    error,
    hasError,
    addCatsHandler,
    toggleSelectedHandler,
    deleteCatsHandler,
    toggleDeletedHandler,
    dispatch,
  } = useCatsDataManager();

  const provider = {
    baseUrl,
    isLoading,
    savedCats,
    selectedCats,
    deletedCats,
    excludedCats,
    error,
    hasError,
    addCatsHandler,
    toggleSelectedHandler,
    deleteCatsHandler,
    toggleDeletedHandler,
    dispatch,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};