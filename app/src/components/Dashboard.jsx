import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCard from './CustomCard'
import Spacer from './Spacer';

const textDesc = [];

textDesc[0] = "Ricerca singolo dipendente";
textDesc[1] = "Lista di tutti i dipendenti";
textDesc[2] = "Ricerca di un singolo cliente";
textDesc[3] = "Lista di tutti i clienti";

export default function Dashboard() {
  return (
    <>
      <Container>
        <Spacer />
        <Container>
          <Row>
            <Col>
              <h1>
                {sessionStorage.azienda_nome}
              </h1>
            </Col>
          </Row>
        </Container>
        <Spacer />
        <Container className='center'>
            <Row className='my-5'>
              <Col>
                <CustomCard
                cardTitle='Cerca Dipendente'
                imgSrc='https://www.svgrepo.com/show/12496/users.svg'
                navPath='/cercapersone'
                buttonText='Ricerca'
                textDesc={textDesc[0]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Lista Dipendenti'
                imgSrc='https://www.svgrepo.com/show/73127/list.svg'
                navPath='/cercapersone'
                buttonText='Mostra'
                textDesc={textDesc[1]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Cerca Cliente'
                imgSrc='https://www.svgrepo.com/show/74282/search.svg'
                navPath='/cercapersone'
                buttonText='Ricerca'
                textDesc={textDesc[2]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Lista CLienti'
                imgSrc='https://www.svgrepo.com/show/40077/briefcase.svg'
                navPath='/cercapersone'
                buttonText='Mostra'
                textDesc={textDesc[3]}/>
              </Col>
            </Row>
        </Container>
      </Container>
    </>
  )
}
