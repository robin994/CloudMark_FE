import React from "react";
import Registrazione from "./components/Registrazione";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopMenu from "./components/TopMenu";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopMenu />}>
          <Route path="signup" element={<Registrazione />} />
        </Route>
        <Route path="*" element={<h1>404 page not found</h1>} />{/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  )
}
