import axios from 'axios'
import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'

let heading = ['Nome', 'Cognome', 'Citta', 'Indirizzo']

let objects = [
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocco',
    'Citta': 'Roma',
    'Indirizzo': 'Via Enrico Jovane, 9'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocca',
    'Citta': 'Milano',
    'Indirizzo': 'Via Enrico Jovane, 10'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocche',
    'Citta': 'Torino',
    'Indirizzo': 'Via Enrico Jovane, 11'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocchi',
    'Citta': 'Bologna',
    'Indirizzo': 'Via Enrico Jovane, 12'
  }
]

interface User {
  id:''
}
interface GetUsersResponse {
  data: User[];
}

// Only for testing purpouses, define your interface you twat
interface DipendenteTest {
  [key: string]: any
}
interface GetDipendenteResponse {
  data: DipendenteTest
}

export default function ListaDipendenti() {
  const [dipendenti, setDipendenti] = useState(getDipendenti);
  // Axios needs to be implemented, waiting for APIs
  const axios = require('axios');

  // Extrapolates the heading from the first data object
  const xtrHeading = (): string[] => {
    return [''] /* Object.keys() */
  }

  return (
      <DataTable id='id' col={heading} rows={objects}/>
  )
}

async function getDipendenti() {

}