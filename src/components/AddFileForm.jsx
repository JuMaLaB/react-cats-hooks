import React, { useContext, useState } from 'react';
import { GlobalContext } from "../utilities/GlobalState";
import config from "../config.json";

const AddFileForm = () => {

  const { baseUrl } = useContext(GlobalContext);
  const apiKey = config.apiKey;

  // console.log(`AddFileForm => `);

  const [isLoading, setIsloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isSucced, setIsSucced] = useState(false);
  const [successMsg, setSuccessMsg] = useState({});

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const fetchPost = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    const headers = new Headers();
    headers.append("x-api-key", apiKey);

    fetch(`${baseUrl}/images/upload`,
      {
        method: 'POST',
        headers: headers,
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSuccessMsg(result);
        setIsSucced(true);
        setIsloading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (isLoading) { return <div>Loading...</div>; }

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSucced ?
        (
          <div>Id = {successMsg.id}<br /></div>
        ) : (
          isSelected ? (
            <>
              <div>
                <p>Filename: {selectedFile.name}</p>
              </div>
              <div>
                <button onClick={() => { setIsloading(true); fetchPost(); }}>Submit</button>
              </div>
            </>
          ) : (
            <p>Select a file to show details</p>
          )
        )
      }

    </div >
  );
};

export default AddFileForm;