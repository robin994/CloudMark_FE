import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css_components/CardCommessa.css';

export default function CardCommessa() {

    return (
            <Card style={{ width: '100', textAlign: 'center', height: '60%' }}>
                <Container className='containerHeight'>
                <Card.Body>
                    <Card.Title>Commessa</Card.Title>
                    <Card.Text>nome  cliente</Card.Text>
                    <Card.Text>data inizio</Card.Text>
                    <Card.Text>data fine</Card.Text>
                    <Button className="btn btn-outline-danger">Elimina</Button>
                    <tr></tr>
                    <Button className="btn btn-outline-danger">salva</Button>
                </Card.Body>
                </Container>
            </Card>
    );
}

