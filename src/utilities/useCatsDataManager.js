import { useEffect, useReducer } from "react";
import catsReducer from "./catsReducer";

const useCatsDataManager = () => {

  // console.log(`useCatsDataManager => `);

  const [
    {
      isLoading,
      catsArray,
      breedsArray,
      excludedCats,
      deletedCats,
      error,
      hasError,
    }, dispatch
  ] = useReducer(catsReducer, {
    isLoading: true,
    catsArray: [],
    breedsArray: [],
    excludedCats: [],
    deletedCats: [],
    error: null,
    hasError: false,
  });

  const baseUrl = "https://api.thecatapi.com/v1";

  const addCatHandler = (cat) => {
    const pushData = () => {
      catsArray.push({ "breeds": cat.breeds, "id": cat.id, "url": cat.url, "width": cat.width, "height": cat.height });
    };
    pushData();
    excludedCats.push(cat.id);
    dispatch({ type: "addCat", data: catsArray });
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

  const findCatById = (catId) => {
    return fetch(`${baseUrl}/images/${catId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`ERROR in response when findCatById with id = "${catId}"" !`);
        }
        return response.json();
      },
        (error) => { console.log(error); }
      );
  };

  useEffect(() => {

    let mounted = true;
    if (!mounted) return;

    const updateExcluded = (cats) => {
      cats.map((item) => {
        if (!excludedCats.includes(item.id)) {
          excludedCats.push(item.id);
        }
      });
    };

    const handleData = async () => {
      try {
        let catsFetchData = await fetchCats(6, "");
        dispatch({ type: "setCats", data: catsFetchData });
        updateExcluded(catsFetchData);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };

    handleData();

    return () => {
      mounted = false;
      console.log('cleanup useCatsDataManager cats data');
    };
  }, []);

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
    isLoading,
    catsArray,
    breedsArray,
    excludedCats,
    deletedCats,
    error,
    hasError,
    fetchCats,
    addCatHandler,
    deleteCatsHandler,
    toggleDeletedHandler,
    findCatById,
  };

  return retObject;
};

export default useCatsDataManager;