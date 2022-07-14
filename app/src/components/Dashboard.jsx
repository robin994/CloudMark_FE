import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCard from './CustomCard'



export default function Dashboard() {
  return (
    <>
      <Container>
          <Container>
              <h1>
                  Nome Azienda
              </h1>
              <h3>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </h3>
          </Container>
        <Container>
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
