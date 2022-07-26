import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './css_components/CardCommessa.css';
import { getMockCommesse } from "../data_mock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'

interface InputData {
    id_order: string,
    startDate: string,
    endDate: string,
    nome_cliente: string
}
interface CardCommessaProps {
    id_lavoro:string
}

export default function CardCommessa(props:CardCommessaProps) {

    const [Lavori, setLavori] = useState<any>([])

    let params = useParams()
    let id_lavoro = params.id_lavoro

    useEffect(() => {
        Axios(`http://localhost:8000/orders/employee/${props.id_lavoro}`, {
            method: "GET"
        }).then(resp => {
            console.log("COMMESSE",Object.values(resp.data.data))
            setLavori(Object.values(resp.data.data))
        }).catch(err => {
            setLavori(err)
        })
    }, [])

    const RenderListElements = (element: InputData) => {
        return (
            <Card>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card.Text>{element.id_order}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>{element.startDate}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>{element.endDate}</Card.Text>
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }

    return (
        <Card style={{ width: '100', textAlign: 'center', height: '60%' }}>
            <Container className='containerHeight'>
                <Card.Header>
                    <Card.Title>Commessa</Card.Title>
                </Card.Header>
                <Card.Body>
                    {Lavori.map((element: InputData, key: number) => RenderListElements(element))}
                </Card.Body>
            </Container>
        </Card>
    );
}

