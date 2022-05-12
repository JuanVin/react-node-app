import { Navbar, Nav, Container } from "react-bootstrap"
import FileSearch from "./FileSearch"


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"><b>U.D.A.P.I.F.</b> <small className="text-muted d-block">Departamento de informática forense</small></Navbar.Brand>
                <Nav>
                    <Nav.Link style={{ fontSize: "18px" }} href="#home">Home</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px" }} href="#features">Buscador</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px", marginRight: "50px" }} href="#pricing">Trabajo</Nav.Link>
                    <FileSearch></FileSearch>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar