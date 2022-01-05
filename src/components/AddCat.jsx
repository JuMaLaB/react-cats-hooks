import React, { useState } from 'react';
import AddCatForm from "./AddCatForm";

import "../css/AddCat.css";

const AddCat = () => {

  // console.log(`AddCat => `);

  const [isInputDisplayed, setInputDisplayed] = useState(false);

  const toggleInput = () => {
    const body = document.body;
    !isInputDisplayed ? body.classList.add("noscroll") : body.classList.remove("noscroll");
    setInputDisplayed(!isInputDisplayed);
  };

  return (
    <>
      <button className="CatInput-button" onClick={toggleInput}>
        Add cat
      </button>
      {isInputDisplayed && (
        <div className={`CatInput-overlay${isInputDisplayed ? " CatInput-overlay-displayed" : ""}`} onClick={toggleInput}>
          <AddCatForm setInputDisplayed={setInputDisplayed} />
        </div>
      )}
    </>
  );
};

export default AddCat;