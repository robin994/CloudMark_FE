import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './css_components/CardCommessa.css';
import { useEffect, useState } from "react";
import Axios from 'axios'

interface CardCommessaProps {
    id_lavoro:string
}

export default function CardCommessa(props:CardCommessaProps) {

    const [commessa, setCommessa] = useState([])

    function getCommesse() {
        Axios(`${process.env.REACT_APP_FASTAPI_URL}/customer/${props.id_lavoro}`, {
            method: "GET"
            })
            .then(resp => {
                setCommessa(resp.data.data);
            });    
    }

    useEffect(() => {
        getCommesse();
    }, []);

    const RenderListElements = (element: any, key:number) => {
        return (
            <Card>
                <Container fluid>
                    <Row className='nomeCliente'>
                        <Col>
                            <Card.Text className='customerName'>{element.customer_name.toUpperCase()}</Card.Text>
                        </Col>
                    </Row>
                    <Row className='date'>
                        <Col className='startDate'>
                            <Card.Text>{element.start_date}</Card.Text>
                        </Col>
                        <Col className='endDate'>
                            <Card.Text>{element.end_date}</Card.Text>
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
                    {commessa.map((element: any, key: number) => {
                        return RenderListElements(element, key);
                    })}
                </Card.Body>
            </Container>
        </Card>
    );
}
