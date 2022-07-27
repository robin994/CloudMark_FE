import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from "react-bootstrap/Card"
import './css_components/SuperUser.css'
import {useState} from 'react'
import Spacer from "./Spacer"

export default function SuperUser() {
    let data = getAziendaData()
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const [show, setShow] = useState(false)
    const Filter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = data.filter((value) => {
          return value.azienda.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
          setFilteredData([])
        } else {
          setFilteredData(newFilter)
        }
      }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = () => setShowDelete(true)

    return (
    <>
    <Spacer margin="20px"/>
    <Container>
      <Card style={{ width: '24rem' }} className="mx-auto">
      <Card.Header className="text-center">
        <h1>Super User</h1>
      </Card.Header>
      <Card.Body className="mycard">
      <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={"Cerca Azienda"}
          value={wordEntered}
          onChange={Filter}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map(
            (value, key) => <p className="azienda_p">{value.azienda} </p>
          )}
        </div>
      )}
    </div>
    <div className="mybox">
        <div>
        <h2 className="modify_azienda">Modifica Azienda</h2>
        <h2 hidden>Super User</h2>
        <form action="">
            <p>
              <input type="text"  placeholder="id_azienda"  className="form-control my-1"/>
              <input type="text"  placeholder="p_iva" className="form-control my-1" />
              <input type="text"  placeholder="iban"  className="form-control my-1"/>
              <input type="text"  placeholder="indirizzo" className="form-control my-1"/>
              <input type="tel"  placeholder="telefono"  className="form-control my-1"/>
              <input type="email"  placeholder="email" className="form-control my-1"/>
              <input type="email"  placeholder="pec" className="form-control my-1"/>
              <input type="tel" placeholder="fax" className="form-control my-1"/>
            </p>
            <p>
            <Button variant="primary" onClick={handleShow}>
                Conferma Modifica
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Azienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicuro di modificare l'Azienda?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                        Sì
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="danger" onClick={handleShowDelete}>
                Elimina Azienda
            </Button>
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Elimina Azienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicuro di Eliminare l'Azienda?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleCloseDelete}>
                        Sì
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            </p>
            </form>
        </div>
    </div>
      </Card.Body>
      </Card>
    </Container>
    </>
  )
}
