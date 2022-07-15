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

export default function CustomCard(props) {
  let navigate = useNavigate();

  async function handleClick() {
    navigate(props.navPath)
  }

  return (
    <>
      <Card style={cardStyle} className=''>
      <Container className='my-auto mx-auto'>
        <Card.Img style={imgStyle} variant="top" src={props.imgSrc} />
          <Card.Body>
              <Card.Title>{props.cardTitle}</Card.Title>
              <Card.Text>
                {props.textDesc}
              </Card.Text>
              <Button style={buttonStyle} variant="primary" onClick={handleClick}>{props.buttonText}</Button>
          </Card.Body>
        </Container>
      </Card>
    </>
  )
}
