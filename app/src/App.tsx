import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Comps from "./components";
import * as Admin from "./pages/admin"
import * as Employee from "./pages/employee"
import * as SU from "./pages/super_user"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Comps.BearerCheck />}>
          <Route element={<Comps.TopMenu />}>
            <Route path="/" element={<Comps.AccountCheck />} />

            <Route element={<Comps.SuperUserCheck />}>
              <Route path="/superuser" element={<SU.Dashboard />} />
              <Route path="/azienda" element={<SU.Azienda />} />
              <Route path="/accounts" element={<SU.Accounts />} />
              <Route path="/tipo/account" element={<SU.TipoAccount />} />
            </Route>
            
            <Route element={<Comps.AdminCheck />}>
              <Route path="/admin" element={<Admin.Dashboard />} />
              <Route path="/dipendenti" element={<Admin.Dipendenti/>} />
              <Route path="/presenze" element={<Admin.Presenze/>} />
              <Route path="/clienti" element={<Admin.Clienti/>} >
                <Route path=":id_customer" element={<Admin.Cliente />} />
              </Route>
              <Route path="/commesse" element={<Admin.Commesse/>} />
              <Route path="/dipendente/:id_dipendente" element={<Admin.Dipendente />} />
              <Route path="/add_dipendenti" element={<Admin.AddDipendente/>} />
            </Route>

            <Route element={<Comps.EmployeeCheck />}>
              <Route path="/employee" element={<Employee.Dashboard />} />
            </Route>

            <Route path="/profile" element={<Comps.ProfiloUtente/>}/>
            <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
            <Route path="/mod-azienda-admin" element={<Comps.ModAziendaAdmin/>}/>
            <Route path="/addazienda" element={<Comps.AddAzienda/>}/>
            <Route path="/cercadipendente" element={<Comps.CercaDipendente />} />
            <Route path="/tabledipendenti" element={<Comps.TableDipendenti/>} />
          
            <Route path="/pagination" element={<Comps.Pagination />} />
          </Route>
          <Route path="/signup" element={<Comps.Registrazione />} />
          <Route path="/login" element={<Comps.Login />} />
        </Route>
        <Route path="*" element={<h1>404 page not found</h1>} /> {/* when no route match the URL-slug */}
      </Routes>
    </BrowserRouter>
  )
}
