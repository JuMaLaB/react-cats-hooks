import { useCallback, useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  // console.log(`useCatsDataManager => `);

  const [
    {
      isLoading,
      catsArray,
      excludedCats,
      selectedCategory,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    excludedCats: [],
    selectedCategory: "",
    error: null,
    hasError: false,
  });

  const baseUrl = "https://api.thecatapi.com/v1";

  const addCatHandler = useCallback((cat) => {
    const pushData = () => {
      catsArray.push({ "id": cat.id, "url": cat.url });
    };
    pushData();
    excludedCats.push(cat.id);
    dispatch({ type: "addCat", data: catsArray });
    return cat.id;
  }, [catsArray, excludedCats]);

  const updateSelectedCategory = useCallback((option) => {
    const id = option.value ? option.value : option;
    dispatch({ type: "setSelectedCategory", id: id });
  }, []);

  const fetchCats = useCallback((limit, selectedCategory) => {
    return fetch(`${baseUrl}/images/search?limit=${limit}&category_ids=${selectedCategory}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchCats !');
        }
        return response.json();
      },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const findCatById = useCallback((catId) => {
    return fetch(`${baseUrl}/images/${catId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`ERROR in response when findCatById with id = "${catId}"" !`);
        }
        return response.json();
      },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const updateExcluded = (cats) => {
      cats.map((item) => {
        if (!excludedCats.includes(item.id)) {
          excludedCats.push(item.id);
        }
      });
    };
    const handleData = async () => {
      try {
        let catsFetchData = await fetchCats(6, selectedCategory);
        dispatch({ type: "setCats", data: catsFetchData });
        updateExcluded(catsFetchData);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
    handleData();

    return () => {
      cancel = true;
      console.log('cleanup useCatsDataManager data');
    };
  }, [excludedCats, fetchCats, selectedCategory]);

  const retObject = {
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

  return retObject;

};

export default useCatsDataManager;