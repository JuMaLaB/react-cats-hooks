import React, { useContext } from "react";
import { Outlet, useMatch } from "react-router-dom";
import { GlobalProvider, GlobalContext } from "../utilities/GlobalState";

import Header from '../components/Header';
import Aside from '../components/Aside';

export default function Home() {

  const initCatsData = useContext(GlobalContext);
  const match = useMatch(location.pathname);
  const isCatPage = match.pathname.includes("cat");

  // console.log(`Home => `);

  return (
    <GlobalProvider value={initCatsData}>
      <div className={`${!isCatPage ? "row" : ""}`}>
        {!isCatPage && (<Aside />)}
        <main className={`app-main ${!isCatPage ? "col-md-10" : ""}`}>
          <Header />
          {match.pathname === '/' && (<span>Welcome to my home page !!!!</span>)}
          <Outlet />
        </main>
      </div >
    </GlobalProvider>
  );
}