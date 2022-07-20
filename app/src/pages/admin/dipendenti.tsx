import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Spacer from '../../components/Spacer'
import DataTable from '../../components/DataTable'

// Heading declaration is strictly necessary
// Syntax: { attributeName : displayName }
let heading = {
  id_employee: 'ID',
  first_name: 'Nome',
  last_name: 'Cognome',
  cf: 'Codice FIscale',
  iban: 'IBAN',
  email: 'Indirizzo E-mail',
  phoneNumber: 'Telefono'
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
  
  console.log(dipendenti)

  async function getDipendenti(str?: string) {
    try {
      const response = await axios.get<any>(`http://localhost:8000/employee`, /* { params: { q: str }} */);
      console.log(response.data.users)
      setDipendenti(Object.values(response.data))
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
    <DataTable id='id_employee' col={heading} rows={dipendenti} setInputField={callSetInputField} baseSlug='/dipendente'/>
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
  