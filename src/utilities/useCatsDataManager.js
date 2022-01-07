import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  // console.log(`useCatsDataManager => `);

  const baseUrl = "https://api.thecatapi.com/v1";

  const [
    {
      isLoading,
      catsArray,
      breedsArray,
      selectedCats,
      deletedCats,
      excludedCats,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    breedsArray: [],
    selectedCats: [],
    deletedCats: [],
    excludedCats: [],
    error: null,
    hasError: false,
  });

  const addCatsHandler = (cats) => {
    const newCatsArray = [...catsArray];
    const newExcludedCats = [...excludedCats];
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
    const newSelectedCats = [...selectedCats];
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
    const newCatsArray = [...catsArray];
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
    const newDeletedCats = [...deletedCats];
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

  const fetchCats = (limit, selectedCategory) => {
    return fetch(`${baseUrl}/images/search?limit=${limit}&category_ids=${selectedCategory}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchCats !');
        }
        return response.json();
      },
        (error) => { console.log(error); }
      );
  };

  const fetchBreeds = () => {
    return fetch(`${baseUrl}/breeds`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchBreeds !');
        }
        return response.json();
      },
        (error) => { console.log(error); }
      );
  };

  useEffect(() => {

    let mounted = true;
    if (!mounted) return;

    const handleBreedsData = async () => {
      try {
        let breedsFetchData = await fetchBreeds();
        dispatch({ type: "setBreeds", data: breedsFetchData });
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };

    handleBreedsData();

    return () => {
      mounted = false;
      console.log('cleanup useCatsDataManager breeds data');
    };
  }, []);

  const retObject = {
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

  return retObject;
};

export default useCatsDataManager;