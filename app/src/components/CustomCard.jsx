import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate } from 'react-router-dom';

const cardStyle = {
  'width': '18rem',
  'height': '20rem',
  'padding-top': 'auto',
  'padding-bottom': 'auto'
}

const imgStyle = {
  'width': '25%',
  'display': 'block',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'object-fit': 'cover'
}

const buttonStyle = {
  
}

export default function CustomCard(props) {
  return (
    <>
      <Card style={cardStyle} className='m y auto'>
        <Card.Img style={imgStyle} variant="top" src={props.imgSrc} />
        <Card.Body>
            <Card.Title>{props.cardTitle}Titolo Card</Card.Title>
            <Card.Text>
              Descrizione delle azioni eseguite.
            </Card.Text>
            <Button style={buttonStyle} variant="primary" onClick={<Navigate to={props.navPath} replace={true} />}>
              {props.buttonText}Placeholder
            </Button>
        </Card.Body>
      </Card>
    </>
  )
}
