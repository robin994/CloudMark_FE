import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from './components/TopMenu';
import logo from './logo.svg';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopMenu />} >
          <Route path="/" element={
            <>
              <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Learn React
                </a>
              </header>
              </div>
            </>
          } />
        </Route>
        <Route path="*" element={<h1>404 page not found</h1>} /> {/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
