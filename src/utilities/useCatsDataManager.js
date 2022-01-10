import { useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  // console.log(`useCatsDataManager => `);

  const baseUrl = "https://api.thecatapi.com/v1";

  const [
    {
      isLoading,
      catsArray,
      selectedCats,
      deletedCats,
      excludedCats,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    selectedCats: [],
    deletedCats: [],
    excludedCats: [],
    error: null,
    hasError: false,
  });

  const addCatsHandler = (cats) => {
    let newCatsArray = [...catsArray];
    let newExcludedCats = [...excludedCats];
    cats.forEach((selectedCat) => {
      newCatsArray.push(selectedCat);
      newExcludedCats.push(selectedCat.id);
    });
    dispatch({ type: "addCat", data: newCatsArray });
    dispatch({ type: "setExcludedCat", data: newExcludedCats });
    dispatch({ type: "setSelectedCat", data: [] });
  };

  const toggleSelectedHandler = (cat) => {
    if (cat === null) {
      dispatch({ type: "setSelectedCat", data: [] });
      return;
    }
    const i = excludedCats.indexOf(cat.id);
    if (i > -1) {
      return;
    }
    let newSelectedCats = [...selectedCats];
    if (!newSelectedCats.includes(cat)) {
      newSelectedCats.push(cat);
    } else {
      const index = newSelectedCats.indexOf(cat);
      if (index > -1) {
        newSelectedCats.splice(index, 1);
      }
    }
    dispatch({ type: "setSelectedCat", data: newSelectedCats });
  };

  const deleteCatsHandler = (cats) => {
    let newCatsArray = [...catsArray];
    cats.forEach((deletedCat) => {
      const index = catsArray.indexOf(deletedCat);
      newCatsArray.splice(index, 1);
      const indexExcluded = excludedCats.indexOf(deletedCat.id);
      excludedCats.splice(indexExcluded, 1);
    });
    dispatch({ type: "deleteCat", data: newCatsArray });
    dispatch({ type: "setDeletedCat", data: [] });
  };

  const toggleDeletedHandler = (cat) => {
    let newDeletedCats = [...deletedCats];
    if (!newDeletedCats.includes(cat)) {
      newDeletedCats.push(cat);
    } else {
      const index = newDeletedCats.indexOf(cat);
      if (index > -1) {
        newDeletedCats.splice(index, 1);
      }
    }
    dispatch({ type: "setDeletedCat", data: newDeletedCats });
  };

  const retObject = {
    baseUrl,
    isLoading,
    catsArray,
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

  return retObject;
};

export default useCatsDataManager;