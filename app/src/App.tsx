import React from "react";
import Registrazione from "./components/Registrazione";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopMenu from "./components/TopMenu";
import logo from "./logo.svg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TopMenu />} />
        <Route path="*" element={<h1>404 page not found</h1>} />{" "}
        {/* when no route match the URL-slug */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
