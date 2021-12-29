import React, { useState, useContext } from 'react';
import { GlobalContext } from "../GlobalState";
import "../css/AddCat.css";

const AddCat = () => {

  const { excludedCats, addCatHandler, findCatById } = useContext(GlobalContext);

  // console.log(`AddCat => `);

  const [displayInput, setDisplayInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [catId, setCatId] = useState("");

  const toggleInput = () => {
    setDisplayInput(!displayInput);
  };

  const handleInputValue = (e) => {
    e.preventDefault;
    setCatId(e.target.value);
  };

  const handleAdd = async (e) => {
    if (e.key !== "Enter") return;
    if (!excludedCats.includes(catId)) {
      let cat = await findCatById(catId);
      addCatHandler(cat);
      toggleInput();
    } else {
      setErrorMsg(`Error cats with id = "${catId}" already exists in list`);
    }
    setCatId("");
  };

  return (
    <>
      <button className="CatInput-button" onClick={toggleInput}>
        Add cat
      </button>
      <div className={`CatInput-overlay${displayInput ? " CatInput-overlay-displayed" : ""}`} onClick={toggleInput}>
        <label className="mr-5">Enter your cat image id</label>
        <div className="input-error">{errorMsg}</div>
        <input className="CatInput-input" type="text"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleInputValue(e)}
          value={catId}
          onKeyPress={(e) => handleAdd(e)} />
      </div>
    </>
  );
};

export default AddCat;