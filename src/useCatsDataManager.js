import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  const [
    {
      catsData,
    }, dispatch
  ] = useReducer(catsReducer, {
    catsData: [],
  });

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
    catsData,
  };

  return retObject;

};

export default useCatsDataManager;