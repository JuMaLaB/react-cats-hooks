import React, { useState, useContext } from 'react';
import { GlobalContext } from "../GlobalState";
import "../css/AddCat.css";

const AddCat = () => {

  const { addCatHandler } = useContext(GlobalContext);

  // console.log(`AddCat - catsData => `);

  const [displayInput, setDisplayInput] = useState(false);
  const [catUrl, setCatUrl] = useState("");

  const toggleInput = () => {
    setDisplayInput(!displayInput);
  };

  const handleInputValue = (e) => {
    e.preventDefault;
    setCatUrl(e.target.value);
  };

  const handleAdd = (e) => {
    if (e.key !== "Enter") return;
    addCatHandler(catUrl);
    setCatUrl("");
    toggleInput();
  };

  return (
    <>
      <button className="CatInput-button" onClick={toggleInput}>
        Add cat
      </button>
      <div className={`CatInput-overlay${displayInput ? " CatInput-overlay-displayed" : ""}`} onClick={toggleInput}>
        <label className="mr-5">Enter your cat image URL</label>
        <input className="CatInput-input" type="text"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleInputValue(e)}
          value={catUrl}
          onKeyPress={(e) => handleAdd(e)} />
      </div>
    </>
  );
};

export default AddCat;