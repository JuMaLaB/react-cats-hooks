import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalState";

const Cat = () => {

  const { catsArray } = useContext(GlobalContext);

  // console.log(`Cat - catsArray =`);
  // console.log(catsArray);

  return (
    <div className="cats-list row px-5">
      {catsArray?.map(({ id, image }) => (
        <div key={id} className="col-lg-2 col-md-4 col-6 p-2">
          <div className="col-12 border rounded p-2">
            <img className="w-100 rounded" src={image?.url} alt="avatar"></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cat;