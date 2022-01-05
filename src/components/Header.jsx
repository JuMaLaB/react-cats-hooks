import React from "react";
import { Link } from "react-router-dom";

import AddCat from "../components/AddCat";
import SearchCat from "../components/SearchCat";

import "../css/Header.css";

export default function About() {


  return (
    <header className="App-header w-100 mb-5">
      <div className="App-header-title w-100">
        Reacats
        <div className="App-header-buttons">
          <AddCat />
          <SearchCat />
        </div>
      </div>
      <nav className="App-header-nav w-100">
        <Link to="/">Home</Link>
        <Link to="/breeds">Breeds</Link>
        <Link to="/cats">My cats album</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
