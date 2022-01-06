import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/home";
import About from "./routes/about";
import BreedsList from "./routes/BreedsList";
import BreedDetails from "./routes/BreedDetails";
import CatList from './routes/CatList';
import CatDetails from "./routes/CatDetails";

import ScrollTop from './utilities/ScrollTop';

import './css/index.css';
import './css/utils.css';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
const errorRouteMsg = "There's nothing here!";

render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="breeds" element={<BreedsList />} />
          <Route path="breed" element={<BreedDetails />} >
            <Route path=":breedId" element={<BreedDetails />} />
          </Route>
          <Route path="cats" element={<CatList />} />
          <Route path="cat" element={<CatDetails />} >
            <Route path=":catId" element={<CatDetails />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>{errorRouteMsg}</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  ,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
