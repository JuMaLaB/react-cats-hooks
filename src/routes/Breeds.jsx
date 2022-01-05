import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/Breeds.css";

const Breeds = () => {

  const { isLoading, breedsArray, error, hasError, } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`Breeds => `);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <>
      <h1>All cat breeds</h1>
      <div className="breeds-list row px-5">
        {breedsArray.map((breed) => (
          <div key={breed.id} className="breeds-details col-lg-2 col-md-4 col-6 p-2">
            <div className="col-12 border rounded p-2">
              <div className="breed-nme">{breed.name}</div>
              <img className="w-100 rounded" src={breed.image?.url} alt="avatar"></img>
              <button onClick={() => { navigate(`/breed/${breed.id}`, { state: breed }); }}>show details</button><br />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Breeds;