import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import './navbar.css'

export default function TopMenu() {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false)
  const toggleCollapse = () => {
    setCollapse(!collapse)
  }
  const brand = ( 
	<>
    <Navbar.Brand href="/">
      <img
      src="/statics/Risorsa 22.png"
      className="d-inline-block align-top"
      width="auto"
      height="40"
      alt="React Bootstrap logo"
      />
      Cloudmark
    </Navbar.Brand>
    <Badge>{sessionStorage.business_name}</Badge>
  </>
  )
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg" key="lg">
        <Container fluid>
          {brand}
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" onClick={toggleCollapse}/>
          <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbar-expand-lg"
              placement="start"
            >
          <Navbar.Collapse  id="responsive-navbar-nav" className="bg-dark">
          <Offcanvas.Header closeButton >
            <Offcanvas.Title >{brand}</Offcanvas.Title>
          </Offcanvas.Header>
            <Nav className="me-auto">
            </Nav>
            <Nav className="d-flex">
              {sessionStorage.bearer ? 
              sessionStorage.accountTypeName === 'super' ? (
                <Nav.Link
                    href="/login"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/login");
                    }}
                >
                  logout
                </Nav.Link>
              ) : 
              (
                <>
                  <Nav.Link
                    href="/login"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/login");
                    }}
                    className="login"
                  >
                    logout
                  </Nav.Link>
                  <Nav.Link href="/profile" className="prof">
                    {sessionStorage.user}
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
