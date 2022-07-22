import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import Spacer from '../../components/Spacer'
import DataTable from '../../components/DataTable'
import DataSearchbar from '../../components/DataSearchbar'

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
      const response = await axios.get<any>(`http://localhost:8000/employee`);
      console.log(response.data.users)
      setDipendenti(Object.values(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  async function callSetInputField({ str }: { str : string }) {
    getDipendenti(str)
  }

  useEffect(()=> {
    getDipendenti('')
  }, [])
  
  const listBlock = (
    <DataTable id='id_employee' col={heading} rows={dipendenti} baseSlug='/dipendente'/>
  )

  return (
    <>
      <Spacer margin='40px'/>
      <Container>
        <Card>
          <Card.Body>
            <DataSearchbar setInputField={callSetInputField}/>
          </Card.Body>
          <Card.Body>
            {listBlock}
          </Card.Body>
        </Card>
      </Container>
      <Spacer margin='120px'/>
    </>
    )
  }
  