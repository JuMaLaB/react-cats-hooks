import React, { useEffect, useState } from "react";
import "../css/SearchCatForm.css";

const SearchCatForm = ({ limit }) => {

  // console.log(`SearchCatForm => `);

  const [isLoading, setIsloading] = useState(true);
  const [catsImgArray, setCatsImgArray] = useState();

  // TODO : add api key in config file
  const fetchImages = () => {
    return fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error('ERROR in response !');
      }
      return response.json();
    },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let catsFetchData = await fetchImages();
        setIsloading(false);
        setCatsImgArray(catsFetchData);
      } catch (e) {
        // TODO handle error
        console.log("Error !!!!");
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    <div className="SearchCatForm">
      {isLoading ? (
        <span>Loading cats...</span>
      ) : (
        <div className="SearchCatForm-results">
          {catsImgArray?.map(cat => (
            <img
              alt=""
              src={cat.url}
              key={cat.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCatForm;
