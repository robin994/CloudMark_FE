import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  'width': '18rem',
  'height': '20rem',
  'margin-top': '20px',
  'margin-bottom': '20px'
}

const imgStyle = {
  'width': '25%',
  'display': 'block',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'object-fit': 'cover'
}

const buttonStyle = {
  'text': 'center'
}

interface CardProps {
  imgSrc: string,
  cardTitle: string,
  textDesc: string,
  buttonText: string
  navPath: string
}

export default function CustomCard(props: CardProps) {
  let navigate = useNavigate();

  async function handleClick() {
    navigate(props.navPath)
  }

  return (
    <>
      <Card style={cardStyle} className=''>
      <Container className='my-auto mx-auto'>
        <Card.Img style={imgStyle} variant="top" src={props.imgSrc} />
          <Card.Body className="text-center">
              <Card.Title>{props.cardTitle}</Card.Title>
              <Card.Text>
                {props.textDesc}
              </Card.Text>
              <Button variant="primary" onClick={handleClick}>{props.buttonText}</Button>
          </Card.Body>
        </Container>
      </Card>
    </>
  )
}
