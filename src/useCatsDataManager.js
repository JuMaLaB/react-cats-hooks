import { useState, useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  const [id, setId] = useState(0);

  const [
    {
      catsArray,
    }, dispatch
  ] = useReducer(catsReducer, {
    catsArray: [],
  });

  // TODO : add api key in config file
  const addCatHandler = (catUrl) => {
    const pushData = () => {
      catsArray.push({ "id": id, "image": { "url": catUrl } });
    };
    dispatch({ type: "addCat", data: catsArray });
    pushData();
    setId(id + 1);
  };

  const fetchCats = () => {
    return fetch(`https://api.thecatapi.com/v1/breeds?page=0&limit=6`, {
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
    addCatHandler,
  };

  return retObject;

};

export default useCatsDataManager;