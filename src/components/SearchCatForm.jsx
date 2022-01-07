import React, { useContext, useEffect, useReducer, useState, Profiler } from "react";
import Select from "react-select";
import { GlobalContext } from "../utilities/GlobalState";
import catsReducer from "../utilities/catsReducer";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { excludedCats, error, hasError, fetchCats, addCatHandler, findCatById } = useContext(GlobalContext);
  const [{ mapCategories }, dispatch] = useReducer(catsReducer, { mapCategories: [] });
  const baseUrl = "https://api.thecatapi.com/v1";

  // console.log(`SearchCatForm => `);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchCatsArray, setSearchCatsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    // actualDuration, // time spent rendering the committed update
    // baseDuration, // estimated time to render the entire subtree without memoization
    // startTime, // when React began rendering this update
    // commitTime, // when React committed this update
    // interactions // the Set of interactions belonging to this update
  ) {
    console.log(`id = ${id} / phase = ${phase}`);
  }

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

  const updateSelectedCategory = (option) => {
    const id = option.value ? option.value : option;
    setSelectedCategory(id);
    dispatch({ type: "setSelectedCategory", id: id });
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
        dispatch({ type: "setCategories", data: newMapCategories });
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

  return (
    <Profiler id="SearchCatForm" onRender={onRenderCallback}>
      <div className="cat-search-form">
        {isLoading ? (
          <span>Loading cats...</span>
        ) : (
          <>
            <div className="cat-search-form-header">
              <Select className="cat-search-form-select" placeholder="Category"
                options={mapCategories}
                value={selectedCategory ? selectedCategory.id : ""}
                onChange={(option) => { updateSelectedCategory(option); }}
              />
              {selectedCats.length > 0 && (
                <button className="cat-search-form-submit"
                  onClick={() => { addCatsHandler(selectedCats); }} >
                  Add selected cats
                </button>
              )}
            </div>
            <div className="cat-search-form-results custom-scroll">
              {searchCatsArray.map(cat => (
                <img key={cat.id} src={cat.url} alt="search img"
                  className={`cat-search-form-img ${selectedCats.includes(cat.id) ? "cat-selected" : ""} ${excludedCats.includes(cat.id) ? "cat-excluded" : ""}`}
                  onClick={() => toggleSelected(cat.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Profiler>
  );

};

export default SearchCatForm;