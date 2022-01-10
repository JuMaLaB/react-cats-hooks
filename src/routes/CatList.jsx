import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/CatsList.css";

const CatsList = () => {

  const { catsArray, toggleDeletedHandler, deletedCats, deleteCatsHandler } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`CatsList => `);

  return (
    <div className="app-cats-list container-fluid text-center custom-scroll">
      <h2>My album</h2>
      {deletedCats.length > 0 && (
        <button className="cats-list-delete-button"
          onClick={() => { deleteCatsHandler(deletedCats); }} >
          Delete selected cats
        </button>
      )}
      <div className="cats-list row">
        {catsArray.map((cat) => (
          <div key={cat.id} className="cats-list-card col-lg-2 col-md-4 col-6 p-2">
            {!deletedCats.includes(cat) ? <span className="custom-close" onClick={() => deleteCatsHandler([cat])}></span> : ""}
            <div className={`col-12 border rounded text-center p-2 ${deletedCats.includes(cat) ? "cat-deleted" : ""}`}>
              <img className="cats-list-card-img w-100 rounded" src={cat.url} alt="avatar"
                onClick={() => toggleDeletedHandler(cat)}></img>
              <button className="cats-list-card-button card-button" onClick={() => { navigate(`/cat/${cat.id}`, { state: cat }); }}>show details</button><br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatsList;