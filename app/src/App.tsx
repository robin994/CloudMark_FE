import React from 'react';

import './App.css';
import Login from './components/Log_In';
import SuperUser from './components/Super_User';
import CercaDipendente from './components/Cerca_Dipendente';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <CercaDipendente/>
      <SuperUser/>
      <Login/>
     
      
      </header>
    </div>
  );
}

export default App;
