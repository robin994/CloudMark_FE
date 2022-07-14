import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCard from './CustomCard'



export default function Dashboard() {
  return (
    <>
      <Container>
        <Container>
          <Row>
            <Col>
              <h1>
                Nome Azienda
              </h1>
            </Col>
            <Col>
              <div>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </Col>
          </Row>
        </Container>
        <Container align="center">
            <Row>
              <Col>
                <CustomCard />
              </Col>
              <Col>
                <CustomCard />
              </Col>
              <Col>
                <CustomCard />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomCard />
              </Col>
              <Col>
                <CustomCard />
              </Col>
              <Col>
                <CustomCard />
              </Col>
            </Row>
        </Container>
      </Container>
    </>
  )
}
