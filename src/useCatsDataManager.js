import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  // console.log(`useCatsDataManager => `);

  const [
    {
      isLoading,
      catsArray,
      excludedCats,
      categories,
      selectedCategory,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    excludedCats: [],
    categories: [],
    selectedCategory: "",
    error: null,
    hasError: false,
  });

  const baseUrl = "https://api.thecatapi.com/v1";

  const addCatHandler = (cat) => {
    const pushData = () => {
      catsArray.push({ "id": cat.id, "url": cat.url });
    };
    pushData();
    excludedCats.push(cat.id);
    dispatch({ type: "addCat", data: catsArray });
    return cat.id;
  };

  const updateSelectedCategory = (option) => {
    const id = option.value ? option.value : option;
    dispatch({ type: "setSelectedCategory", id: id });
  };

  const fetchCategory = async () => {
    try {
      let categoriesArray = await fetchCategories();
      dispatch({ type: "setCategories", data: categoriesArray });
    } catch (e) {
      dispatch({ type: "errorHandler", error: e });
    }
  };

  const fetchCategories = () => {
    return fetch(`${baseUrl}/categories`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchCategories !');
        }
        return response.json();
      },
        (error) => {
          console.log(error);
        }
      );
  };

  const fetchCats = (limit, selectedCategory) => {
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
  };

  const findCatById = (catId) => {
    return fetch(`${baseUrl}/images/${catId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when findCatById !');
        }
        return response.json();
      },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    const updateExcluded = (cats) => {
      cats.map((item) => {
        if (!excludedCats.includes(item.id)) {
          excludedCats.push(item.id);
        }
      });
    };
    const fetchData = async () => {
      try {
        let catsFetchData = await fetchCats(6, selectedCategory);
        dispatch({ type: "setCats", data: catsFetchData });
        updateExcluded(catsFetchData);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
    fetchData();

    return () => {
      console.log('cleanup useCatsDataManager data');
    };
  }, []);

  const retObject = {
    isLoading,
    catsArray,
    excludedCats,
    categories,
    selectedCategory,
    error,
    hasError,
    fetchCategory,
    fetchCats,
    addCatHandler,
    findCatById,
    updateSelectedCategory,
  };

  return retObject;

};

export default useCatsDataManager;