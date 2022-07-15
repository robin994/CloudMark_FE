import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getListaDipendenti } from "../data_mock";
import CustomCard from "./CustomCard";
import Spacer from "./Spacer"
import "./Dipendente.css"

export default function Dipendente() {
    const navigate = useNavigate()
    if (sessionStorage.auth === "false") {
        navigate("/login")
    }
    let params = useParams()
    let lista_dipendenti = getListaDipendenti()
    // Axios("api/dipendentebyid", {GET})
    let dipendente = lista_dipendenti[params.id_dipendente]
    return (
        <div className="mycentereddiv">
            <Card style={{ width: '18rem' }}>
                <Card.Img src="/statics/dipendente.jpg" />
                <Card.Header>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{`contratto: ${dipendente.tipo_contratto}`}</ListGroup.Item>
                    <ListGroup.Item>{`email: ${dipendente.email}`}</ListGroup.Item>
                    <ListGroup.Item>{`telefono: ${dipendente.telefono}`}</ListGroup.Item>
                    <ListGroup.Item>{`codice fiscale: ${dipendente.cf}`}</ListGroup.Item>
                    <ListGroup.Item>{`iban: ${dipendente.iban}`}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    )
}