import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap"

interface PresenceId{
  id_presenza:string
}

export default function ModalePresenza(props:PresenceId) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [id_dipendente, setIdDipendente] = useState('')
    const [data, setData] = useState('')
    const [idTipoPresenza, setIdTipoPresenza] = useState('')
    const [idCommessa, setIdCommessa] = useState('')
    const [ore, setOre] = useState(0)
    const [id_presenza, setPresenza] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/update`, {
            id_dipendente: id_dipendente,
            data_presenza: data,
            idTipoPresenza: idTipoPresenza,
            idCommessa: idCommessa,
            ore: ore,
            id_presenza: id_presenza
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>

            <Button variant="primary" onClick={handleShow}>
               Modifica Presenza
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci Presenza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id="id_dipendente" type="text" placeholder="Id Dipendente" className="form-control" required onChange={(e) => setIdDipendente(e.target.value)}></input>
                    <input id="data_presenza" type="date" placeholder="Data Presenza" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setData(e.target.value)} />
                    <input id="id_tipo_presenza" type="text" placeholder="Id Tipo Presenza" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setIdTipoPresenza(e.target.value)} />
                    <input id="id_commessa" type="text" placeholder="Id Commessa" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setIdCommessa(e.target.value)} />
                    <input id="ore" type="number" placeholder="Ore" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setOre(Number(e.target.value))} />
                    <input id={props.id_presenza} type="text" placeholder={props.id_presenza} className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setPresenza(e.target.value)} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} onSubmit={handleSubmit} type="submit" style={{ width: "100%" }}>
                        Inserisci Dati
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}