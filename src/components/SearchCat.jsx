import React, { useState } from "react";
import SearchCatForm from "./SearchCatForm";

import "../css/SearchCat.css";

const SearchCat = () => {

  // console.log(`SearchCat => `);

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const toggleForm = () => {
    setIsFormDisplayed(!isFormDisplayed);
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