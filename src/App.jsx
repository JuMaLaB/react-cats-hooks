import React, { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./GlobalState";

import Cat from "./components/Cat";
import AddCat from "./components/AddCat";
import "./css/App.css";

const App = () => {

  const initCatsData = useContext(GlobalContext);

  // console.log(`App - initCatsData => `);
  // console.log(initCatsData);

  return (
    <GlobalProvider value={initCatsData}>
      <div className="App row mb-5 justify-content-center">
        <header className="App-header w-100 mb-5">
          Reacats
          <div className="App-header-buttons">
            <AddCat />
          </div>
        </header>
        <main>
          <Cat />
        </main>
      </div>
    </GlobalProvider>
  );
};

export default App;
