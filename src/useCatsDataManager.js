import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  const [
    {
      catsArray,
      excludedCats,
    }, dispatch
  ] = useReducer(catsReducer, {
    catsArray: [],
    excludedCats: [],
  });

  const updateExcluded = (cats) => {
    cats.map((item) => {
      if (!excludedCats.includes(item.id)) {
        excludedCats.push(item.id);
      }
    });
  };

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
  const fetchCats = () => {
    return fetch(`https://api.thecatapi.com/v1/images/search?limit=6`, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error('ERROR in response !');
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
        throw Error('ERROR in response !');
      }
      return response.json();
    },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let catsFetchData = await fetchCats();
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
  }, []);

  const retObject = {
    catsArray,
    excludedCats,
    addCatHandler,
    findCatById,
  };

  return retObject;

};

export default useCatsDataManager;