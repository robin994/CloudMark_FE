import { useState, useEffect } from 'react'
import DataTable from "../../../components/DataTable"
import axios from 'axios'
import { Modal, Button, Card, Container, Form } from 'react-bootstrap'
import DataSearchbar from '../../../components/DataSearchbar'
import DatePicker from 'sassy-datepicker'

interface PresenzeProps {
  id_employee: string,
  year: string,
  month: string
}

const heading = {
  id_employee: "ID dipendente",
  date_presence: "Data",
  id_tipoPresenza: "ID Tipo presenza",
  id_order: "ID ordine",
  hours: "ore",
  id_presence: "ID presenza"
}

export default function Presenze(props: PresenzeProps) {
  const [presenze, setPresenze] = useState([])
  const [showInsMod, setInsMod] = useState(false)
  const [showEditMod, setEditMod] = useState(false)

  async function getPresenze() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/load`,{
        id_employee: sessionStorage.id_employee,
        year: 2022,
        month: 1
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
    getPresenze()
  }, [])

  const handleOpenIns = () => setInsMod(true);
  const handleCloseIns = () => setInsMod(false);

  const handleOpenEdit = () => setEditMod(true);
  const handleCloseEdit = () => setEditMod(false);

  // Trigger EDIT BUTTON
  function callEdit(id_presence: string) {
    alert(id_presence)
  }

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
          <DataSearchbar setInputField={()=> false} />
          <Button onClick={handleOpenIns}>
            Nuova
          </Button>
        </Container>
      </Card.Body>
      <Card.Body>
        <DataTable id='id_presence' col={heading} rows={presenze} btnCallback={callEdit} />
      </Card.Body>
    </Card>
  )
}
