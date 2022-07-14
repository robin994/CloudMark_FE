import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function TopMenu() {
    return (
        <>
          <Navbar sticky="top" bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Brand href="/">
                  <img src="statics/cloud.png" className="d-inline-block align-top" width="40" height="40" alt="React Bootstrap logo"/>
                    Cloudmark
                </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="calendario">Calendario</Nav.Link>
                <Nav.Link href="dipendenti">Dipendenti</Nav.Link>
                <Nav.Link href="commesse">Commesse</Nav.Link>
              </Nav>
              <Nav className="d-flex">
              { sessionStorage.auth ? <Nav.Link href="profile">{sessionStorage.username}</Nav.Link> : (
                  <>
                    <Nav.Link href="login">Login</Nav.Link>
                    <Nav.Link href="signup">Sign up</Nav.Link>
                  </>
              )}
              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Outlet />
        </>
    )
}
