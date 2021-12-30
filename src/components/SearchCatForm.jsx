import React, { useContext, useEffect, useReducer, useState } from "react";
import Select from "react-select";
import { GlobalContext } from "../GlobalState";
import catsReducer from "../catsReducer";

import "../css/SearchCatForm.css";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { excludedCats, selectedCategory, error, hasError, fetchCats, addCatHandler, findCatById, updateSelectedCategory } = useContext(GlobalContext);
  const baseUrl = "https://api.thecatapi.com/v1";

  // TODO : understand why there is so much rendering 
  // console.log(`SearchCatForm => `);

  const [selectedCats, setSelectedCats] = useState([]);
  const [searchCatsArray, setSearchCatsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [{ mapCategories }, dispatch] = useReducer(catsReducer, { mapCategories: [], });

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
    const fetchCategory = async () => {
      try {
        let categoriesArray = await fetchCategories();
        const newMapCategories = categoriesArray.map(item => {
          const option = { value: item.id, label: item.name };
          return option;
        });
        dispatch({ type: "setMapCategories", data: newMapCategories });
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
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
        setSearchCatsArray(newSearchCatsArray);
        setIsloading(false);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };
    fetchData();
    return () => {
      console.log('cleanup SearchCatForm');
    };
  }, [limit, fetchCats, selectedCategory]);


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
