import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap"



export default function ModalePresenza() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [id_dipendente, setIdDipendente] = useState('')
    const [data, setData] = useState('')
    const [idTipoPresenza, setIdTipoPresenza] = useState('')
    const [idCommessa, setIdCommessa] = useState('')
    const [ore, setOre] = useState(0)

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/create`, {
            id_dipendente: id_dipendente ,
            data: data,
            idTipoPresenza: idTipoPresenza,
            idCommessa: idCommessa,
            ore: ore,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div style={{ backgroundColor: "gainsboro", borderBottom: "1px solid black", borderTop: "1px solid black", padding: "0.5rem", marginTop: "5vh", display: "flex" }}>
            <div>
                <h1>Presenza</h1>

                <Button variant="primary" onClick={handleShow}>
                    Aggiungi Presenza
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inserisci Presenza</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input id="id_dipendente" type="text" placeholder="Id Dipendente" className="form-control" required onChange={(e) => setIdDipendente(e.target.value)}></input>
                        <input id="data_presenza" type="date" placeholder="Data Presenza" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setData(e.target.value)}/>
                        <input id="id_tipo_presenza" type="text" placeholder="Id Tipo Presenza" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setIdTipoPresenza(e.target.value)}/>
                        <input id="id_commessa" type="text" placeholder="Id Commessa" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setIdCommessa(e.target.value)}/>
                        <input id="ore" type="number" placeholder="Ore" className="form-control" style={{ marginTop: "1vh" }} required onChange={(e) => setOre(Number(e.target.value))}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose} onSubmit={handleSubmit} type="submit" style={{ width: "100%" }}>
                            Inserisci Dati
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}