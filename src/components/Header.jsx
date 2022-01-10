import React from "react";
import { Link } from "react-router-dom";

import AddCat from "../components/AddCat";
import AddFile from "../components/AddFile";
import SearchCat from "../components/SearchCat";

import "../css/Header.css";

export default function Header() {

  // console.log(`Header => `);

  return (
    <header className="app-header">
      <div className="app-header-title">
        <h1>Reacats</h1>
        <div className="app-header-buttons">
          <AddCat />
          <AddFile />
          <SearchCat />
        </div>
      </div>
      <nav className="app-header-nav">
        <Link to="/">Home</Link>
        <Link to="/breeds">Breeds</Link>
        <Link to="/cats">My album</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
