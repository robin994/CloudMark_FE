import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Comps from "./components";
import * as Admin from "./pages/admin"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Comps.TopMenu />}>
          <Route path="/dipendenti" element={<Admin.Dipendenti />} />
          <Route path="/presenze" element={<Admin.Presenze/>} />
          <Route path="/clienti" element={<Admin.Clienti/>} />
          <Route path="/commesse" element={<Admin.Commesse/>} />

          <Route path="/" element={<Admin.Dashboard />} />
          <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="/superuser" element={<Comps.SuperUser />} />
          <Route path="/dipendente/:id_dipendente" element={<Comps.Dipendente />} />
          <Route path="/mod-azienda-admin" element={<Comps.ModAziendaAdmin/>}/>
          <Route path="/addazienda" element={<Comps.addAziendaComponent/>}/>
          <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="/tabledipendenti" element={<Comps.TableDipendenti/>} />
        </Route>
        <Route path="/test_verify" element={<Comps.TestVerify />} />
        <Route path="/signup" element={<Comps.Registrazione />} />
        <Route path="/login" element={<Comps.Login />} />
        <Route path="*" element={<h1>404 page not found</h1>} /> {/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  )
}
