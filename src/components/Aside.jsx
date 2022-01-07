import React, { useContext } from "react";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/Aside.css";

export default function Aside() {

  const { catsArray, toggleDeletedHandler, deletedCats, deleteCatsHandler } = useContext(GlobalContext);

  // console.log(`Aside => `);

  return (
    <aside className="app-aside col-md-2">
      <div className="aside-cats-list custom-scroll">
        <h3>My album</h3>
        {catsArray.map((cat) => (
          <div key={cat.id} className="aside-cats-list-card p-2">
            {!deletedCats.includes(cat) ? <span className="custom-close" onClick={() => deleteCatsHandler([cat])}></span> : ""}
            <div className={`col-12 border rounded p-2 ${deletedCats.includes(cat) ? "cat-deleted" : ""}`}>
              <img className="w-100 rounded " src={cat.url} alt="avatar"
                onClick={() => toggleDeletedHandler(cat)}></img>
            </div>
          </div>
        ))}
        {deletedCats.length > 0 && (
          <button className="aside-cats-list-delete-button"
            onClick={() => { deleteCatsHandler(deletedCats); }} >
            Delete selected cats
          </button>
        )}
      </div>
    </aside >
  );
}
