import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

import "../css/BreedsList.css";

const BreedsList = () => {

  const { baseUrl, error, hasError, dispatch } = useContext(GlobalContext);
  let navigate = useNavigate();

  // console.log(`BreedsList => `);

  const [breedsArray, setBreedsArray] = useState([]);
  const [isLoading, setIsloading] = useState(true);



  useEffect(() => {

    let mounted = true;
    if (!mounted) return;

    const fetchBreeds = () => {
      return fetch(`${baseUrl}/breeds`)
        .then((response) => {
          if (!response.ok) {
            throw Error('ERROR in response when fetchBreeds !');
          }
          return response.json();
        },
          (error) => { console.log(error); }
        );
    };

    const handleBreedsData = async () => {
      try {
        const breedsFetchData = await fetchBreeds();
        setBreedsArray(breedsFetchData);
        setIsloading(false);
      } catch (e) {
        dispatch({ type: "errorHandler", error: e });
      }
    };

    handleBreedsData();

    return () => {
      mounted = false;
      console.log('cleanup useCatsDataManager breeds data');
    };
  }, [baseUrl, dispatch]);

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