import React, { useContext } from "react";
import { Outlet, useMatch } from "react-router-dom";
import { GlobalProvider, GlobalContext } from "../utilities/GlobalState";

import Header from '../components/Header';

export default function Home() {

  const initCatsData = useContext(GlobalContext);
  const match = useMatch(location.pathname);

  // console.log(`About => `);

  return (
    <GlobalProvider value={initCatsData}>
      <div className="App row mb-5 justify-content-center">
        <Header />
        <main>
          {match.pathname === '/' && (<span>Welcome to my home page !!!!</span>)}
          <Outlet />
        </main>
      </div >
    </GlobalProvider>
  );
}