import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/CatList.css";

const CatList = () => {

  const { isLoading, catsArray, error, hasError, } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`CatList => `);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <div className="cats-list row px-5">
      {catsArray.map((cat) => (
        <div key={cat.id} className="cat-details col-lg-2 col-md-4 col-6 p-2">
          <div className="col-12 border rounded p-2">
            <img className="w-100 rounded" src={cat.url} alt="avatar"></img>
            <button onClick={() => { navigate(`/cat/${cat.id}`, { state: cat }); }}>show details</button><br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatList;