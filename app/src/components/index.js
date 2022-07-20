// Pages for: pages/superuser
/* import Aziende from "../pages/superuser/aziende"
import Utenti from "../pages/superuser/utenti" */

// Pages for: pages/admin
import Dashboard from "../pages/admin/dashboard"
import Dipendenti from "../pages/admin/dipendenti"
import Presenze from "../pages/admin/presenze"
import Clienti from "../pages/admin/clienti"
import Commesse from "../pages/admin/commesse"

// Pages for: pages/employee
/* import Presenze from "../pages/employee/presenze" */

import CercaDipendente from "./CercaDipendente"
import Login from "./Login"
import Registrazione from "./Registrazione"
import TopMenu from "../pages/navbar"
import SuperUser from "./Super_User"
import DipendentiLista from "../pages/admin/clienti"
import Dipendente from "./Dipendente"
import ModAziendaAdmin  from "./ModAziendaAdmin"
import addAziendaComponent from "./AddAzienda"
// New separe index should be created for root pages
import ListaDipendenti from "../pages/admin/dipendenti"
import TableDipendenti from './TableDipendenti'
import TestVerify from "./TestVerify"

export { CercaDipendente, Login, Registrazione, TopMenu, SuperUser, Dashboard, DipendentiLista,
         Dipendente, ModAziendaAdmin, addAziendaComponent, ListaDipendenti, TableDipendenti,
         TestVerify }
