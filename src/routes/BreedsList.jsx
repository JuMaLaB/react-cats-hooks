import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/BreedsList.css";

const BreedsList = () => {

  const { isLoading, breedsArray, error, hasError } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`BreedsList => `);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <section className="app-breeds-list container-fluid text-center custom-scroll">
      <h2>All cats breeds</h2>
      <div className="breeds-list row">
        {breedsArray.map((breed) => (
          <div key={breed.id} className="breeds-list-card col-lg-2 col-md-4 col-6 p-2">
            <div className="col-12 border rounded p-2">
              <div className="breeds-list-card-name"><span>{breed.name}</span></div>
              <img className="breeds-list-card-img w-100 rounded" src={breed.image?.url} alt="avatar"></img>
              <button className="breeds-list-card-button card-button" onClick={() => { navigate(`/breed/${breed.id}`, { state: breed }); }}>show details</button><br />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BreedsList;