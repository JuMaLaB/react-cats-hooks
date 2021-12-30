import React from "react";
import useCatsDataManager from "./useCatsDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  // console.log(`GlobalProvider => `);

  const {
    isLoading,
    catsArray,
    excludedCats,
    selectedCategory,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    findCatById,
    updateSelectedCategory,
  } = useCatsDataManager();

  const provider = {
    isLoading,
    catsArray,
    excludedCats,
    selectedCategory,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    findCatById,
    updateSelectedCategory,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {children}
    </GlobalContext.Provider>
  );
};