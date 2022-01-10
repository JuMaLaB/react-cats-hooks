import React, { useState } from 'react';
import AddFileForm from './AddFileForm';
import "../css/AddFile.css";

const AddFile = () => {

  // console.log(`AddFile => `);

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const toggleForm = () => {
    setIsFormDisplayed(!isFormDisplayed);
  };

  return (
    <>
      <button className="header-add-file primary-button" onClick={toggleForm}>
        Add file
      </button>
      {isFormDisplayed && (
        <div className="overlay add-file-overlay" onClick={toggleForm}>
          <div className="add-file-content" onClick={(e) => e.stopPropagation()} >
            <AddFileForm toggleForm={toggleForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddFile;