import React, { useContext, useEffect, useReducer, useState, Profiler } from "react";
import Select from "react-select";
import { GlobalContext } from "../GlobalState";
import catsReducer from "../catsReducer";

import "../css/SearchCatForm.css";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { excludedCats, selectedCategory, error, hasError, fetchCats, addCatHandler, findCatById, updateSelectedCategory } = useContext(GlobalContext);
  const baseUrl = "https://api.thecatapi.com/v1";

  // console.log(`SearchCatForm => `);

  const [selectedCats, setSelectedCats] = useState([]);
  const [searchCatsArray, setSearchCatsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [{ mapCategories }, dispatch] = useReducer(catsReducer, { mapCategories: [], });

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

    let mounted = true;
    if (!mounted) return;

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

    const handleCategories = async () => {
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
    handleCategories();

    return () => {
      mounted = false;
      console.log('cleanup SearchCatForm categories');
    };
  }, []);

  useEffect(() => {

    let mounted = true;
    if (!mounted) return;

    const handleData = async () => {
      try {
        let newSearchCatsArray = await fetchCats(limit, selectedCategory);
        setSearchCatsArray(newSearchCatsArray);
        setIsloading(false);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };

    handleData();

    return () => {
      mounted = false;
      console.log('cleanup SearchCatForm data');
    };
  }, [selectedCategory]);


  if (hasError === true) { return <div>Error: {error.message}</div>; }

  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    console.log(`id = ${id} / phase = ${phase} / actualDuration = ${actualDuration} / baseDuration = ${baseDuration} / startTime = ${startTime} / commitTime = ${commitTime} / interactions = ${interactions}`);
    // console.log("interactions : ");
    // console.log(interactions);
  }

  return (
    <Profiler id="SearchCatForm" onRender={onRenderCallback}>
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
    </Profiler>
  );

};

export default SearchCatForm;