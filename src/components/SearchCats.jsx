import React, { useState } from "react";
import SearchCatForm from "./SearchCatForm";

import "../css/SearchCats.css";

const SearchCats = () => {

  // console.log(`SearchCats => `);

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const toggleForm = () => {
    setIsFormDisplayed(!isFormDisplayed);
  };

  return (
    <>
      <button className="SearchCat-button" onClick={toggleForm}>
        Search cat
      </button>
      {isFormDisplayed && (
        <div className="SearchCat-overlay" onClick={toggleForm}>
          <div className="SearchCat-content" onClick={(e) => e.stopPropagation()} >
            <SearchCatForm limit={100} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCats;