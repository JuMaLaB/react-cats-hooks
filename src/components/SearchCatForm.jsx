import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState";
import useCatsDataManager from "../useCatsDataManager";
import "../css/SearchCatForm.css";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { excludedCats, error, hasError, fetchCats, addCatHandler, findCatById } = useContext(GlobalContext);
  const { dispatch } = useCatsDataManager();

  // console.log(`SearchCatForm => `);

  const [selectedCats, setSelectedCats] = useState([]);
  const [searchCatsArray, setSearchCatsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const toggleSelected = (catId) => {
    const newSelectedCats = [...selectedCats];

    if (!newSelectedCats.includes(catId)) {
      newSelectedCats.push(catId);
    } else {
      const index = newSelectedCats.indexOf(catId);
      if (index > -1) {
        newSelectedCats.splice(index, 1);
      }
    }
    setSelectedCats(newSelectedCats);
  };

  const addCatsHandler = (selectedCats) => {
    selectedCats.forEach(async (catId) => {
      let cat = await findCatById(catId);
      addCatHandler(cat);
    });
    setSelectedCats([]);
    toggleForm();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newSearchCatsArray = await fetchCats(limit);
        setIsloading(false);
        setSearchCatsArray(newSearchCatsArray);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, [fetchCats, limit, dispatch]);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  return (
    <div className="SearchCatForm">
      {isLoading ? (
        <span>Loading cats...</span>
      ) : (
        <div className="SearchCatForm-results">
          {searchCatsArray.map(cat => (
            <img
              alt=""
              src={cat.url}
              key={cat.id}
              onClick={() => toggleSelected(cat.id)}
              className={`
                ${selectedCats.includes(cat.id) ? "SearchCatForm-selected" : ""}
                ${excludedCats.includes(cat.id) ? "SearchCatForm-excluded" : ""}
              `}
            />
          ))}
        </div>
      )}
      {selectedCats.length > 0 && (
        <button
          className="SearchCatForm-submit"
          onClick={() => { addCatsHandler(selectedCats); }} >
          Add Cats
        </button>
      )}
    </div>
  );

};

export default SearchCatForm;
