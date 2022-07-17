import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Spacer from '../../components/Spacer'
import DataTable from '../../components/DataTable'

// Heading declaration is strictly necessary
// Syntax: { attributeName : displayName }
let heading = {
  id: 'ID',
  firstName: 'Nome',
  lastName: 'Cognome',
  age: 'Età',
  gender: 'Genere',
  birthDate: 'Data di Nascita',
  email: 'Indirizzo E-mail',
  phone: 'Telefono'
}

// PlaceholderJSON API Response Interface
interface DummyJSONresponse {
  users: DipendentiTest
}
// Only for testing purpouses, define your interface
// Defines an array of any type, with string keys
interface DipendentiTest {
  [key: string]: any
}

export default function ListaDipendenti() {
  const [dipendenti, setDipendenti] = useState<DummyJSONresponse[]>([]);
  
  async function getDipendenti() {
    try {
      const response = await axios.get<any>('https://dummyjson.com/users');
      setDipendenti(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getDipendenti()
  }, [])
  
  // TO BE DEPRECATED!
/*   // Extrapolates the heading from the first data object
  const xtrHeading = (): string[] => {
    if (Object.keys(dipendenti).length > 0) {
      return Object.keys(dipendenti[0])
    } else {
      return ['']
    }
  } */
  
  const listBlock = (
    <DataTable id='id' col={heading} rows={dipendenti}/>
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
  