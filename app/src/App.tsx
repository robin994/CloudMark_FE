import React from 'react';
import './App.css';
import { addAziendaComponent } from './components/addAzienda';
import { modAziendaAdmin } from './components/modAziendaAdmin';

function App() {
  return (
    <div className="App">
      {modAziendaAdmin()}
    </div>
  );
}

export default App;
