import React from 'react';
import { useLocation } from "react-router-dom";

const BreedDetail = () => {

  const location = useLocation();
  const breed = location.state;

  // console.log(`BreedDetail => `);

  const maxWidth = 500;
  const calcMaxHeight = (breed.image?.height / breed.image?.width) * maxWidth + "px";

  return (
    <div className="breed-details">
      <img className="" src={breed.image?.url} alt="breed img" width={`${breed.image?.width}px`} height={`${breed.image?.height}px`} style={{ maxWidth: '500px', maxHeight: calcMaxHeight }}></img>
      <div>
        Name = {breed.name}<br />
        Description = {breed.description}<br />
        Temperament = {breed.temperament}<br />
      </div>
    </div >
  );
};

export default BreedDetail;