import { Navbar, Nav, Container } from "react-bootstrap"
const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"><b>U.D.A.P.I.F.</b> <small className="text-muted d-block">Departamento de informática forense</small></Navbar.Brand>
                <Nav>
                    <Nav.Link style={{fontSize: "18px"}} href="#home">Home</Nav.Link>
                    <Nav.Link style={{fontSize: "18px"}} href="#features">Buscador</Nav.Link>
                    <Nav.Link style={{fontSize: "18px"}} href="#pricing">Trabajo</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar