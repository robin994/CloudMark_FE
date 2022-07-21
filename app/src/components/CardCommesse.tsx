import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function CardCommesse() {

    return (
        <Card border="danger" style={{ width: '18rem', textAlign: 'center' }}>
            <Card.Body>
                <Card.Title>Commessa</Card.Title>
                <Card.Text>nome  cliente</Card.Text>
                <Card.Text>data inizio</Card.Text>
                <Card.Text>data fine</Card.Text>
                <Button className="btn btn-outline-danger">Elimina</Button>
                <tr></tr>
                <Button className="btn btn-outline-danger">salva</Button>
            </Card.Body>
        </Card>
    );
}

