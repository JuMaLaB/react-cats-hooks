import React, { useContext, useEffect, useState, Profiler } from "react";
import Select from "react-select";
import { GlobalContext } from "../utilities/GlobalState";

const SearchCatForm = ({ limit, toggleForm }) => {

  const { baseUrl, selectedCats, excludedCats, error, hasError, dispatch, addCatsHandler, toggleSelectedHandler } = useContext(GlobalContext);

  // console.log(`SearchCatForm => `);

  const [categories, setCategories] = useState([]);
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

  const handleAdd = () => {
    addCatsHandler(selectedCats);
    toggleForm();
  };

  const updateSelectedCategory = (option) => {
    const id = option.value ? option.value : option;
    setSelectedCategory(id);
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
          (error) => { console.log(error); }
        );
    };

    const handleCategories = async () => {
      try {
        const categoriesArray = await fetchCategories();
        const mapCategories = categoriesArray.map(item => {
          const option = { value: item.id, label: item.name };
          return option;
        });
        setCategories(mapCategories);
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
    setIsloading(true);

    const handleData = async () => {
      try {
        const newSearchCatsArray = await fetchCats(limit, selectedCategory);
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


  if (hasError === true) { return <div className="cat-search-error">Error: {error.message}</div>; }

  return (
    <Profiler id="SearchCatForm" onRender={onRenderCallback}>
      <div className="cat-search-form">
        <div className="cat-search-form-header">
          <Select className="cat-search-form-select" placeholder="Category"
            options={categories}
            value={selectedCategory ? selectedCategory.id : ""}
            onChange={(option) => { updateSelectedCategory(option); }}
          />
          {selectedCats.length > 0 && (
            <button className="cat-search-form-submit"
              onClick={() => { handleAdd(); }} >
              Add selected cats
            </button>
          )}
        </div>
        {isLoading ? (
          <span className="text-secondary">Loading cats...</span>
        ) : (
          <>
            <div className="cat-search-form-results custom-scroll">
              {searchCatsArray.map(cat => (
                <img key={cat.id} src={cat.url} alt="search img"
                  className={`cat-search-form-img ${selectedCats.includes(cat) ? "cat-selected" : ""}
                    ${excludedCats.includes(cat.id) ? "cat-excluded" : ""}`}
                  onClick={() => toggleSelectedHandler(cat)}
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