import React, { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./GlobalState";

import Cat from "./components/Cat";

import "./App.css";

const App = () => {

  const initCatsData = useContext(GlobalContext);

  return (
    <GlobalProvider value={initCatsData}>
      <div className="App">
        <header className="App-header">
          Reacats
        </header>
        <main>
          <Cat />
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
