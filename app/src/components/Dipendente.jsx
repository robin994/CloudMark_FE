import { Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getListaDipendenti } from "../data_mock";
import { useEffect } from "react";
import './css_components/Dipendente.css'

export default function Dipendente() {
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.auth === undefined)
            navigate("/login", {replace: true})
    }, [navigate])
    let params = useParams()
    let lista_dipendenti = getListaDipendenti()
    // Axios("api/dipendentebyid", {GET})
    let dipendente = lista_dipendenti[params.id_dipendente]
    return (
        <div className="mycentereddiv">
            <Card style={{ width: '18rem' }}>
            <Card.Header className="text-center"><h3>{`${dipendente.nome} ${dipendente.cognome}`}</h3></Card.Header>
                <Card.Img src="/statics/dipendente.jpg" />
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