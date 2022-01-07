import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/CatsList.css";

const CatsList = () => {

  const { isLoading, catsArray, error, hasError, deleteCatsHandler } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`CatsList => `);

  const [deletedCats, setDeletedCats] = useState([]);

  const toggleDeleted = (cat) => {
    const newDeletedCats = [...deletedCats];
    if (!newDeletedCats.includes(cat)) {
      newDeletedCats.push(cat);
    } else {
      const index = newDeletedCats.indexOf(cat);
      if (index > -1) {
        newDeletedCats.splice(index, 1);
      }
    }
    setDeletedCats(newDeletedCats);
  };

  const deleteCats = (deletedCats) => {
    deleteCatsHandler(deletedCats);
    setDeletedCats([]);
  };

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <div className="app-cats-list container-fluid text-center custom-scroll">
      <h2>My album</h2>
      {deletedCats.length > 0 && (
        <button className="breed-details-button"
          onClick={() => { deleteCats(deletedCats); }} >
          Delete selected cats
        </button>
      )}
      <div className="cats-list row">
        {catsArray.map((cat) => (
          <div key={cat.id} className="cats-list-card col-lg-2 col-md-4 col-6 p-2">
            {!deletedCats.includes(cat) ? <span className="custom-close" onClick={() => deleteCatsHandler([cat])}></span> : ""}
            <div className={`col-12 border rounded text-center p-2 ${deletedCats.includes(cat) ? "cat-deleted" : ""}`}>
              <img className="cats-list-card-img w-100 rounded" src={cat.url} alt="avatar"
                onClick={() => toggleDeleted(cat)}></img>
              <button className="cats-list-card-button card-button" onClick={() => { navigate(`/cat/${cat.id}`, { state: cat }); }}>show details</button><br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatsList;