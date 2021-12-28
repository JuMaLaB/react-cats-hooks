import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  const [
    {
      isLoading,
      catsArray,
      excludedCats,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    excludedCats: [],
    error: null,
    hasError: false,
  });

  const addCatHandler = (cat) => {
    const pushData = () => {
      catsArray.push({ "id": cat.id, "url": cat.url });
    };
    pushData();
    excludedCats.push(cat.id);
    dispatch({ type: "addCat", data: catsArray });
    return cat.id;
  };

  // TODO : add api key in config file
  const fetchCats = (limit) => {
    return fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }
    }).then((response) => {
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

  // TODO : add api key in config file
  const findCatById = (catId) => {
    return fetch(`https://api.thecatapi.com/v1/images/${catId}`, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }
    }).then((response) => {
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
        let catsFetchData = await fetchCats(6);
        dispatch({ type: "setCats", data: catsFetchData });
        updateExcluded(catsFetchData);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, [excludedCats]);

  const retObject = {
    isLoading,
    catsArray,
    excludedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    findCatById,
  };

  return retObject;

};

export default useCatsDataManager;