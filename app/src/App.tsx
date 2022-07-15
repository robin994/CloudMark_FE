import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Comps from "./components";

export default function App() {
  sessionStorage.auth = "false"
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Comps.TopMenu />}>
          <Route path="/" element={<Comps.Dashboard />} />
          <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="/signup" element={<Comps.Registrazione />} />
          <Route path="/dashboard" element={<Comps.Dashboard />} />
          <Route path="/superuser" element={<Comps.SuperUser />} />
          <Route path="/lista_dipendenti" element={<Comps.DipendentiLista />} />
            <Route path="/dipendente/:id_dipendente" element={<Comps.Dipendente />} />
          <Route path="mod-azienda-admin" element={<Comps.modAziendaAdmin/>}/>
          <Route path="addazienda" element={<Comps.addAziendaComponent/>}/>
          <Route path="cercadipendente" element={<Comps.CercaDipendente />} />
          <Route path="signup" element={<Comps.Registrazione />} />
          <Route path="dashboard" element={<Comps.Dashboard />} />
          <Route path="superuser" element={<Comps.SuperUser />} />
        </Route>
        <Route path="login" element={<Comps.Login />} />
        <Route path="*" element={<h1>404 page not found</h1>} />{/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  )
}
