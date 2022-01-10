import React, { useContext, useState } from 'react';
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../utilities/GlobalState";

const BreedDetails = () => {

  const { baseUrl, selectedCats, excludedCats, error, hasError, dispatch, addCatsHandler, toggleSelectedHandler } = useContext(GlobalContext);

  // console.log(`BreedDetails => `);

  const location = useLocation();
  const breed = location.state;
  const [isLoading, setIsloading] = useState(true);
  const [breedImagesArray, setBreedImagesArray] = useState([]);

  const maxWidth = 500;
  const calcMaxHeight = (breed.image?.height / breed.image?.width) * maxWidth + "px";

  const fetchBreedImages = (breedId) => {
    return fetch(`${baseUrl}/images/search?breed_id=${breedId}&limit=100`)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response when fetchCategories !');
        }
        return response.json();
      },
        (error) => { console.log(error); }
      );
  };

  const handleBreedImages = async (breedId) => {
    try {
      setIsloading(true);
      const newBreedImagesArray = await fetchBreedImages(breedId);
      setBreedImagesArray(newBreedImagesArray);
      setIsloading(false);
    } catch (e) {
      dispatch({ type: "errorHandler", error: e });
    }
  };

  return (
    <section className="app-breed-details text-center custom-scroll">

      <h2>Breed : {breed.name}</h2>
      <div key={breed.id} className="breed-details">
        <img className="breed-details-img" src={breed.image?.url} alt="breed img"
          width={`${breed.image?.width}px`}
          height={`${breed.image?.height}px`}
          style={{ maxWidth: '500px', maxHeight: calcMaxHeight }}></img>
        <div className="breed-details-descr">
          Temperament = {breed.temperament}<br /><br />
          Description = {breed.description}<br />
        </div>
        <button className="breed-details-button"
          onClick={() => handleBreedImages(breed.id)}>
          Show breed images
        </button>
      </div >

      {selectedCats.length > 0 && (
        <button className="breed-details-button"
          onClick={() => { addCatsHandler(selectedCats); }} >
          Add selected cats
        </button>
      )}

      <div className="breed-details-images container-fluid">
        <div className="row">
          {hasError && (
            <div>Error: {error.message}</div>
          )}
          {isLoading && (
            <div>Loading...</div>
          )}
          {breedImagesArray && (
            breedImagesArray.map((cat) => (
              <div key={cat.id} className="breed-details-image-details col-lg-2 col-md-4 col-6 py-2">
                <div className={`col-12 border rounded p-2 ${selectedCats.includes(cat) ? "cat-selected" : ""}`}>
                  <img className={`w-100 rounded ${excludedCats.includes(cat.id) ? "cat-excluded" : ""}`}
                    src={cat.url}
                    alt="avatar"
                    onClick={() => toggleSelectedHandler(cat)}></img>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </section>
  );
};

export default BreedDetails;