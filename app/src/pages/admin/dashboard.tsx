import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCard from '../../components/CustomCard';
import Spacer from '../../components/Spacer';

const textDesc: string[] = [];

textDesc[0] = "Operazioni sui Dipendenti";
textDesc[1] = "Lista di tutti i dipendenti";
textDesc[2] = "Ricerca di un singolo cliente";
textDesc[3] = "Lista di tutti i clienti";

export default function Dashboard() {
  return (
    <>
      <Container>
        <Spacer margin='60px' />
        <Container>
          <Row>
            <Col>
              <h3>
                Benvenuto Admin
              </h3>
              <h1>
                {sessionStorage.azienda_nome}
              </h1>
            </Col>
          </Row>
        </Container>
        <Spacer margin='100px' />
        <Container className='center'>
            <Row className='my-5'>
              <Col>
                <CustomCard
                cardTitle='Dipendenti'
                imgSrc='https://www.svgrepo.com/show/12496/users.svg'
                navPath='/dipendenti'
                buttonText='Ricerca'
                textDesc={textDesc[0]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Presenze'
                imgSrc='https://www.svgrepo.com/show/73127/list.svg'
                navPath='/presenze'
                buttonText='Mostra'
                textDesc={textDesc[1]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Clienti'
                imgSrc='https://www.svgrepo.com/show/74282/search.svg'
                navPath='/clienti'
                buttonText='Ricerca'
                textDesc={textDesc[2]}/>
              </Col>
              <Col>
              <CustomCard
                cardTitle='Commesse'
                imgSrc='https://www.svgrepo.com/show/40077/briefcase.svg'
                navPath='/commesse'
                buttonText='Mostra'
                textDesc={textDesc[3]}/>
              </Col>
            </Row>
        </Container>
      </Container>
    </>
  )
}