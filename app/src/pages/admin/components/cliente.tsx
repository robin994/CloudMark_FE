import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from 'axios'

export default function Cliente() {
    const [customer, setCustomer] = useState<any>({})
    let params = useParams()
    let id_customer = params.id_customer
    useEffect( () => {
         Axios(`${process.env.REACT_APP_FASTAPI_URL}/customer/${id_customer}`, {
        method: "POST"
    }).then( resp => {
        setCustomer(resp.data.data)
    }).catch( err => {
        setCustomer(err)
    })}, [id_customer])
    return (
            <Card style={{ width: '18rem' }}>
            <Card.Header className="text-center"><h3>{`${customer.name}`}</h3></Card.Header>
                <Card.Img src="/statics/customer.jpg" />
                <ListGroup variant="flush">
                    <ListGroup.Item>{`IVA: ${customer.p_iva}`}</ListGroup.Item>
                    <ListGroup.Item>{`Address: ${customer.address}`}</ListGroup.Item>
                    <ListGroup.Item>{`CAP: ${customer.cap}`}</ListGroup.Item>
                    <ListGroup.Item>{`IBAN: ${customer.iban}`}</ListGroup.Item>
                    <ListGroup.Item>{`Email: ${customer.email}`}</ListGroup.Item>
                    <ListGroup.Item>{`PEC: ${customer.pec}`}</ListGroup.Item>
                    <ListGroup.Item>{`FAX: ${customer.fax}`}</ListGroup.Item>
                    <ListGroup.Item>{`Phone: ${customer.phone}`}</ListGroup.Item>
                </ListGroup>
            </Card>
    )
}