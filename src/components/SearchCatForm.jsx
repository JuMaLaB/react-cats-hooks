import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { GlobalContext } from "../GlobalState";

import "../css/SearchCatForm.css";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { excludedCats, categories, selectedCategory, error, hasError, fetchCategory, fetchCats, addCatHandler, findCatById, updateSelectedCategory } = useContext(GlobalContext);

  // TODO : understand why there is so much rendering 
  // console.log(`SearchCatForm => `);

  const [selectedCats, setSelectedCats] = useState([]);
  const [searchCatsArray, setSearchCatsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const mapCategories = categories.map(item => {
    const option = { value: item.id, label: item.name };
    return option;
  });

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
    updateSelectedCategory("");
    fetchCategory();
    return () => {
      console.log('cleanup SearchCatForm');
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newSearchCatsArray = await fetchCats(limit, selectedCategory);
        setIsloading(false);
        setSearchCatsArray(newSearchCatsArray);
      } catch (e) {
        // TODO try to dispatch error
        console.log("error = " + e);
      }
    };
    fetchData();

    return () => {
      console.log('cleanup SearchCatForm');
    };
  }, [selectedCategory]);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  return (
    <div className="SearchCatForm">
      {isLoading ? (
        <span>Loading cats...</span>
      ) : (
        <>
          <Select
            options={mapCategories}
            placeholder="Category"
            value={selectedCategory ? selectedCategory.id : "prout"}
            onChange={(option) => { updateSelectedCategory(option); }}
            className="SearchCatForm-select"
          />
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
        </>
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
