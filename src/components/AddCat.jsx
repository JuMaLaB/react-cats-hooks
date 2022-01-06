import React, { useState } from 'react';
import AddCatForm from "./AddCatForm";

import "../css/AddCat.css";

const AddCat = () => {

  // console.log(`AddCat => `);

  const [isInputDisplayed, setInputDisplayed] = useState(false);

  const toggleInput = () => {
    setInputDisplayed(!isInputDisplayed);
  };

  return (
    <>
      <button className="header-add-cat primary-button" onClick={toggleInput}>
        Add cat
      </button>
      {isInputDisplayed && (
        <div className="overlay cat-input-overlay" onClick={toggleInput}>
          <AddCatForm setInputDisplayed={setInputDisplayed} />
        </div>
      )}
    </>
  );
};

export default AddCat;