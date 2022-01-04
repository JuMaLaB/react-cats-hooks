import React from 'react';
import { useLocation } from "react-router-dom";

import "../css/CatDetails.css";

const CatDetail = () => {

  const location = useLocation();
  const cat = location.state;

  // console.log(`CatDetail => `);

  const maxWidth = 500;
  const calcMaxHeight = (cat.height / cat.width) * maxWidth + "px";

  return (
    <div className="cat-detail">
      <img className="" src={cat.url} alt="avatar" width={`${cat.width}px`} height={`${cat.height}px`} style={{ maxWidth: '500px', maxHeight: calcMaxHeight }} ></img>
      <div>
        ID = {cat.id}<br />
        URL = {cat.url}<br />
        width = {cat.width}<br />
        height = {cat.height}<br />
      </div>
    </div >
  );
};

export default CatDetail;