import React from 'react';
import { useLocation } from "react-router-dom";

const CatDetails = () => {

  const location = useLocation();
  const cat = location.state;

  // console.log(`CatDetails => `);

  const maxWidth = 500;
  const calcMaxHeight = (cat.height / cat.width) * maxWidth + "px";

  return (
    <div className="app-cat-details text-center custom-scroll">
      <h2>My cat details</h2>
      <img className="cat-details-img" src={cat.url} alt="avatar" width={`${cat.width}px`} height={`${cat.height}px`} style={{ maxWidth: '500px', maxHeight: calcMaxHeight }} ></img>
      <div>
        ID = {cat.id}<br />
        URL = {cat.url}<br />
        width = {cat.width}<br />
        height = {cat.height}<br />
      </div>
    </div >
  );
};

export default CatDetails;