import React, { useState } from 'react';
import AddCatForm from "./AddCatForm";

import "../css/AddCat.css";

const AddCat = () => {

  // console.log(`AddCat => `);

  const [displayInput, setDisplayInput] = useState(false);

  const toggleInput = () => {
    setDisplayInput(!displayInput);
  };

  return (
    <>
      <button className="CatInput-button" onClick={toggleInput}>
        Add cat
      </button>
      {displayInput && (
        <div className={`CatInput-overlay${displayInput ? " CatInput-overlay-displayed" : ""}`} onClick={toggleInput}>
          <AddCatForm setDisplayInput={setDisplayInput} />
        </div>
      )}
    </>
  );
};

export default AddCat;