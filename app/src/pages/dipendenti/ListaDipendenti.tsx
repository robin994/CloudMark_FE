import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Spacer from '../../components/Spacer'
import DataTable from '../../components/DataTable'

let heading = ['id', 'Nome', 'Cognome', 'Citta', 'Indirizzo']

let objects = [
  {
    'id': '0',
    'Nome': 'Alessandro',
    'Cognome': 'Rocco',
    'Citta': 'Roma',
    'Indirizzo': 'Via Enrico Jovane, 9'
  },
  {
    'id': '1',
    'Nome': 'Alessandro',
    'Cognome': 'Rocca',
    'Citta': 'Milano',
    'Indirizzo': 'Via Enrico Jovane, 10'
  },
  {
    'id': '2',
    'Nome': 'Alessandro',
    'Cognome': 'Rocche',
    'Citta': 'Torino',
    'Indirizzo': 'Via Enrico Jovane, 11'
  },
  {
    'id': '3',
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
    // address: Address,
    phone: string,
    website: string,
    // company: Company
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
    if (Object.keys(dipendenti).length > 0) {
      return Object.keys(dipendenti[0])
    } else {
      return ['']
    }
  }
  
  const listBlock = (
    <DataTable id='id' col={/* xtrHeading() */heading} rows={objects/* dipendenti */}/>
  )

  return (
    <>
      <Spacer margin='100px'/>
      <Container>
        {listBlock}
      </Container>
    </>
    )
  }
  