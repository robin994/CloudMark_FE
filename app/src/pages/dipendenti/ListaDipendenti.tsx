import axios from 'axios'
import { useState, useEffect } from 'react'
import { Placeholder } from 'react-bootstrap'
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

// PlaceholderJSON API Response Interface
interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company
    }
// PlaceholderJSON API Response Interface
interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo
}
// PlaceholderJSON API Response Interface
interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}
// PlaceholderJSON API Response Interface
interface Geo {
  lat: string,
  lng: string
}

// Only for testing purpouses, define your interface you twat
interface DipendentiTest {
  [key: string]: any
}
interface GetDipendentiResponse {
  data: DipendentiTest
}

export default function ListaDipendenti() {
  const [dipendenti, setDipendenti] = useState<User[]>([]);
  
  async function getDipendenti() {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      setDipendenti(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getDipendenti()
  }, [])
  
  // Extrapolates the heading from the first data object
  const xtrHeading = (): string[] => {
    return [''] /* Object.keys() */
  }
  
  return (
    <>
    {/* <DataTable id='id' col={heading} rows={dipendenti}/> */}
    </>
    )
  }
  