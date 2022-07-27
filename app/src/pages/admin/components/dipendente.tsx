import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from 'axios'

export default function Dipendente() {
    const [dipendente, setDipendente] = useState<any>({})

    let params = useParams()
    let id_dipendente = params.id_dipendente
    
    useEffect( () => {
         Axios(`${process.env.REACT_APP_FASTAPI_URL}/employee/${id_dipendente}`, {
        method: "GET"
    }).then( resp => {
        let dipendenti = resp.data.data
        const dip = Object.values(dipendenti)[0]
        console.log(dip)
        setDipendente(dip)
    }).catch( err => {
        setDipendente(err)
    })}, [])

    return (
        <div className="mycentereddiv">
            <Card style={{ width: '18rem' }}>
            <Card.Header className="text-center"><h3>{`${dipendente.first_name} ${dipendente.last_name}`}</h3></Card.Header>
                <Card.Img src="/statics/dipendente.jpg" />
                <ListGroup variant="flush">
                    <ListGroup.Item>{`Codice Fiscale: ${dipendente.cf}`}</ListGroup.Item>
                    <ListGroup.Item>{`IBAN: ${dipendente.iban}`}</ListGroup.Item>
                    <ListGroup.Item>{`ID tipo contratto: ${dipendente.id_contractType}`}</ListGroup.Item>
                    <ListGroup.Item>{`Email: ${dipendente.email}`}</ListGroup.Item>
                    <ListGroup.Item>{`Telefono: ${dipendente.phoneNumber}`}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    )
}