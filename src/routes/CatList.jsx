import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/CatsList.css";

const CatsList = () => {

  const { isLoading, catsArray, error, hasError, } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`CatsList => `);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <div className="app-cats-list container-fluid text-center custom-scroll">
      <h2>My album</h2>
      <div className="cats-list row">
        {catsArray.map((cat) => (
          <div key={cat.id} className="cats-list-card col-lg-2 col-md-4 col-6 p-2">
            <div className="col-12 border rounded text-center p-2">
              <img className="cats-list-card-img w-100 rounded" src={cat.url} alt="avatar"></img>
              <button className="cats-list-card-button card-button" onClick={() => { navigate(`/cat/${cat.id}`, { state: cat }); }}>show details</button><br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatsList;