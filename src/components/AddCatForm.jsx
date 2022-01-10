import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from "../utilities/GlobalState";

const AddCatForm = ({ setInputDisplayed }) => {

  const { baseUrl, excludedCats, addCatsHandler } = useContext(GlobalContext);

  // console.log(`AddCatForm => `);

  const [errorMsg, setErrorMsg] = useState("");
  const [catId, setCatId] = useState("");

  const handleInputValue = (e) => {
    e.preventDefault;
    setCatId(e.target.value);
  };

  const findCatById = (catId) => {
    return fetch(`${baseUrl}/images/${catId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`ERROR in response when findCatById with id = "${catId}"" !`);
        }
        return response.json();
      },
        (error) => { console.log(error); }
      );
  };

  const handleAdd = async (e) => {
    if (e.key !== "Enter") return;
    if (!excludedCats.includes(catId)) {
      try {
        const cat = await findCatById(catId);
        addCatsHandler([cat]);
        setInputDisplayed(false);
      } catch (e) {
        setErrorMsg(e.message);
      }
    } else {
      setErrorMsg(`Error cats with id = "${catId}" already exists in list`);
    }
    setCatId("");
  };

  useEffect(() => {
    let mounted = true;
    if (!mounted) return;
    return () => {
      mounted = false;
      console.log('cleanup AddCatForm');
    };
  }, []);

  return (
    <>
      <label className="mr-5">Enter your cat image id</label>
      <div className="cat-input-error">{errorMsg}</div>
      <input className="cat-input" type="text" value={catId}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleInputValue(e)}
        onKeyPress={(e) => handleAdd(e)} />
    </>
  );
};

export default AddCatForm;