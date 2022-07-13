import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TopMenu from './components/TopMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopMenu />} >
          <Route path="app" element={
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
