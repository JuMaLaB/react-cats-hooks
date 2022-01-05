import React, { useContext, useState, useReducer } from 'react';
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";
import catsReducer from "../utilities/catsReducer";

const BreedDetail = () => {

  const { error, hasError } = useContext(GlobalContext);
  const [{ breedImagesArray }, dispatch] = useReducer(catsReducer, { breedImagesArray: [], });

  const baseUrl = "https://api.thecatapi.com/v1";
  const location = useLocation();
  const breed = location.state;
  const [isLoading, setIsloading] = useState(false);

  const maxWidth = 500;
  const calcMaxHeight = (breed.image?.height / breed.image?.width) * maxWidth + "px";

  // console.log(`BreedDetail => `);

  const fetchBreedImages = (breedId) => {
    return fetch(`${baseUrl}/images/search?breed_id=${breedId}&limit=100`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchCategories !');
        }
        return response.json();
      },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleBreedImages = async (breedId) => {
    try {
      setIsloading(true);
      let breedImagesArray = await fetchBreedImages(breedId);
      dispatch({ type: "setBreedImagesArray", data: breedImagesArray });
      setIsloading(false);
    } catch (e) {
      dispatch({ type: "errorHandler", error: e });
    }
  };

  return (
    <>
      <div key={breed.id} className="breed-details">
        <img src={breed.image?.url} alt="breed img" width={`${breed.image?.width}px`} height={`${breed.image?.height}px`} style={{ maxWidth: '500px', maxHeight: calcMaxHeight }}></img>
        <div className="breed-details-descr">
          Name = {breed.name}<br /><br />
          Temperament = {breed.temperament}<br /><br />
          Description = {breed.description}<br />
        </div>
        <button onClick={() => handleBreedImages(breed.id)}>Show breed images</button>
      </div >
      <div className="breed-details-images row px-5">
        {hasError && (
          <div>Error: {error.message}</div>
        )}
        {isLoading && (
          <div>Loading...</div>
        )}
        {breedImagesArray && (
          breedImagesArray.map((breed) => (
            <div key={breed.id} className="breed-details-image-details col-lg-2 col-md-4 col-6 p-2">
              <div className="col-12 border rounded p-2">
                <img className="w-100 rounded" src={breed.url} alt="avatar"></img>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BreedDetail;