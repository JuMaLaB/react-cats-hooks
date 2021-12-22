import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalState";

const Cat = () => {

  const { catsData } = useContext(GlobalContext);

  console.log(catsData);

  return (
    <div className="cats-list">
      {catsData?.map(({name, image}) => (
        <div key={name} className="">
          <div className="">
            <img className="" src={image?.url} alt="avatar"></img>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cat;