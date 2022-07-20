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
  
  async function getDipendenti(str?: string) {
    try {
      const response = await axios.get<any>(`https://dummyjson.com/users/search`, { params: { q: str }});
      setDipendenti(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  // CallBack to retrieve data from Child component
  async function callSetInputField({ str }: { str : string }) {
    getDipendenti(str)
  }

  // Initializes the employee list on the first render
  useEffect(()=> {
    getDipendenti('')
  }, [])
  
  const listBlock = (
    <DataTable id='id' col={heading} rows={dipendenti} setInputField={callSetInputField} baseSlug='/dipendente'/>
  )

  return (
    <>
      <Spacer margin='40px'/>
      <Container>
        {listBlock}
      </Container>
      <Spacer margin='120px'/>
    </>
    )
  }
  