import React, { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./GlobalState";

import Cat from "./components/Cat";
import AddCat from "./components/AddCat";
import SearchCat from "./components/SearchCat";
import "./css/App.css";

const App = () => {

  const initCatsData = useContext(GlobalContext);

  // console.log(`App => `);

  return (
    <GlobalProvider value={initCatsData}>
      <div className="App row mb-5 justify-content-center">
        <header className="App-header w-100 mb-5">
          Reacats
          <div className="App-header-buttons">
            <AddCat />
            <SearchCat />
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
