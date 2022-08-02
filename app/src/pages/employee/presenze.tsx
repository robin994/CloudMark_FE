import { useState, useEffect } from 'react'
import DataTable from "../../components/DataTable"
import axios from 'axios'
import { Modal, Button, Card, Container, Form } from 'react-bootstrap'
import DatePicker from 'sassy-datepicker'
import EditableTable from '../../components/PresenceTable'
import PresenceTable from './components/PresenceTable'

interface PresenzeProps {
  id_employee: string,
  year: string,
  month: string
}

export default function Presenze(props: PresenzeProps) {
  const [presenze, setPresenze] = useState([])
  const [showInsMod, setInsMod] = useState(false)

  async function getPresenze() {
    try {
      console.log('REQESTING PRESENCE ON DATE -->', `${props.month}/${props.year}`)
      const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/load`,{
        id_employee: sessionStorage.id_employee,
        year: props.year,
        month: props.month
      }, { 
        headers: {accept: "application/json", "Content-Type": "application/json" }
      })
      console.log(response.data.data)
      setPresenze(response.data.data)
    } catch(error) {
      throw error
    }
  }

  useEffect(()=> {
    getPresenze();
  }, [props.year, props.month])

  const handleOpenIns = () => setInsMod(true);
  const handleCloseIns = () => setInsMod(false);

  const insertModal = (
    <Modal show={showInsMod} onHide={handleCloseIns}>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Presenza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <DatePicker />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIns}>
            Esci
          </Button>
          <Button variant="primary" onClick={()=> false}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>
  )

  return (
    <Card>
      {insertModal}
      <Card.Body>
        <Container>
          <Button onClick={handleOpenIns}>
            Nuova
          </Button>
        </Container>
      </Card.Body>
      <Card.Body>
        <PresenceTable rows={presenze} />
        <EditableTable id='id_presence' rows={presenze} showID={false} />
      </Card.Body>
    </Card>
  )
}
