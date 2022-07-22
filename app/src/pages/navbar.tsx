import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

export default function TopMenu() {
    const navigate = useNavigate()
    return (
        <>
          <Navbar sticky="top" bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Brand href="/">
                  <img src="/statics/cloud.png" className="d-inline-block align-top" width="40" height="40" alt="React Bootstrap logo"/>
                    Cloudmark
                </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/calendario">Calendario</Nav.Link>
                <Nav.Link href="/dipendenti">Dipendenti</Nav.Link>
                <Nav.Link href="/commesse">Commesse</Nav.Link>
                <Nav.Link href="/employee">Dipendente</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/superuser">Superuser</Nav.Link>
              </Nav>
              <Nav className="d-flex">
              { sessionStorage.bearer ? (
                <>
                  <Nav.Link href="/login" onClick={() => {
                    sessionStorage.removeItem("bearer")
                    sessionStorage.removeItem("account_username")
                    navigate("/login")
                  }}>logout</Nav.Link> 
                  <Nav.Link href="profile">{sessionStorage.account_username}</Nav.Link>
                </>
              )
              : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
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
