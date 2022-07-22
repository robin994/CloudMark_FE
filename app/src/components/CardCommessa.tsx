import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './css_components/CardCommessa.css';
import { getMockCommesse } from "../data_mock";

interface InputData {
    codice_commessa: string,
    data_inizio: string,
    data_fine: string,
    nome_cliente: string
}

export default function CardCommessa() {

    const RenderListElements = (element: InputData) => {
        return (
            <Card>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card.Text>{element.codice_commessa}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>{element.data_inizio}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>{element.data_fine}</Card.Text>
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
                    {getMockCommesse().map((element: InputData, key: number) => RenderListElements(element))}
                </Card.Body>
            </Container>
        </Card>
    );
}

