import { Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from 'axios'

export default function Cliente() {
    const [customer, setCustomer] = useState<any>({})
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (sessionStorage.bearer === undefined)
    //         navigate("/login", {replace: true})
    // }, [navigate])
    let params = useParams()
    let id_customer = params.id_customer
    useEffect( () => {
         Axios(`http://localhost:8000/customer/${id_customer}`, {
        method: "POST"
    }).then( resp => {
        setCustomer(resp.data.data)
    }).catch( err => {
        setCustomer(err)
    })}, [])

    return (
        <div className="mycentereddiv">
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
                </ListGroup>
            </Card>
        </div>
    )
}