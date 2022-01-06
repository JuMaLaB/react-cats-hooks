import React, { useContext } from "react";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/Aside.css";

export default function Aside() {

  const { catsArray, } = useContext(GlobalContext);

  // console.log(`Aside => `);

  return (
    <aside className="app-aside col-md-2">
      <div className="app-aside-container custom-scroll">
        <h3>My album</h3>
        {catsArray.map((cat) => (
          <div key={cat.id} className="cat-details p-2">
            <div className="col-12 border rounded p-2">
              <img className="w-100 rounded" src={cat.url} alt="avatar"></img>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
