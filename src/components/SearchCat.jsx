import React, { useContext, useState } from "react";
import { GlobalContext } from "../utilities/GlobalState";
import SearchCatForm from "./SearchCatForm";

import "../css/SearchCat.css";

const SearchCat = () => {

  const { toggleSelectedHandler } = useContext(GlobalContext);
  // console.log(`SearchCat => `);

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const toggleForm = () => {
    setIsFormDisplayed(!isFormDisplayed);
    toggleSelectedHandler(null);
  };

  return (
    <>
      <button className="header-search-cat primary-button" onClick={toggleForm}>
        Search cat
      </button>
      {isFormDisplayed && (
        <div className="overlay cat-search-overlay" onClick={toggleForm}>
          <div className="cat-search-content" onClick={(e) => e.stopPropagation()} >
            <SearchCatForm limit={100} toggleForm={toggleForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCat;