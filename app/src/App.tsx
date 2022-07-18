import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Comps from "./components";
import AziendaData from "./components/Azienda.json";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Comps.TopMenu />}>
          <Route path="/" element={<Comps.Dashboard />} />
          <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="/dashboard" element={<Comps.Dashboard />} />
          <Route path="/superuser" element={<Comps.SuperUser placeholder="Cerca Azienda" data = {AziendaData}/>} />
          <Route path="/dipendenti" element={<Comps.DipendentiLista />} />
          <Route path="/lista_dipendenti" element={<Comps.ListaDipendenti />} />
          <Route path="/dipendente/:id_dipendente" element={<Comps.Dipendente />} />
          <Route path="/mod-azienda-admin" element={<Comps.ModAziendaAdmin/>}/>
          <Route path="/addazienda" element={<Comps.addAziendaComponent/>}/>
          <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="/signup" element={<Comps.Registrazione />} />
          <Route path="/dashboard" element={<Comps.Dashboard />} />
        
        </Route>
        <Route path="/signup" element={<Comps.Registrazione />} />
        <Route path="/login" element={<Comps.Login />} />
        <Route path="*" element={<h1>404 page not found</h1>} /> {/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  )
}
