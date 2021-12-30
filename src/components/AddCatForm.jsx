import React, { useState, useContext } from 'react';
import { GlobalContext } from "../GlobalState";

const AddCatForm = ({ setDisplayInput }) => {

  const { excludedCats, addCatHandler, findCatById } = useContext(GlobalContext);

  console.log(`AddCatForm => `);

  const [errorMsg, setErrorMsg] = useState("");
  const [catId, setCatId] = useState("");

  const handleInputValue = (e) => {
    e.preventDefault;
    setCatId(e.target.value);
  };

  const handleAdd = async (e) => {
    if (e.key !== "Enter") return;
    if (!excludedCats.includes(catId)) {
      let cat = await findCatById(catId);
      addCatHandler(cat);
      setDisplayInput(false);
    } else {
      setErrorMsg(`Error cats with id = "${catId}" already exists in list`);
    }
    setCatId("");
  };

  return (
    <>
      <label className="mr-5">Enter your cat image id</label>
      <div className="input-error">{errorMsg}</div>
      <input className="CatInput-input" type="text"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleInputValue(e)}
        value={catId}
        onKeyPress={(e) => handleAdd(e)} />
    </>
  );
};

export default AddCatForm;