import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/home";
import About from "./routes/about";
import CatList from './routes/CatList';
import CatDetails from "./routes/CatDetails";

import './css/index.css';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
const errorRouteMsg = "There's nothing here!";

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
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
