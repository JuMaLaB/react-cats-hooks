import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalState";

const Cat = () => {

  const { isLoading, catsArray, error, hasError, } = useContext(GlobalContext);

  // console.log(`Cat => `);

  if (hasError === true) { return <div>Error: {error.message}</div>; }

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <div className="cats-list row px-5">
      {catsArray.map(({ id, url }) => (
        <div key={id} className="col-lg-2 col-md-4 col-6 p-2">
          <div className="col-12 border rounded p-2">
            <img className="w-100 rounded" src={url} alt="avatar"></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cat;